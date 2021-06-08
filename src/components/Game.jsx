import React, { Component } from "react"
import Board from './Board'
import './Game.css'

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.previousStates = [];

        this.state = {
            squareValues : Array(9).fill(Array(9).fill('')),
            completedSquares : Array(9).fill(Array(9).fill(false)),
            initialSquares : Array(9).fill(Array(9).fill(false)),
            difficulty: 'easy',
            victory: false
        };

        this.onDifficultyChange = this.onDifficultyChange.bind(this);
    }


    componentDidMount() {
        this.getGame();
    }

    async getGame() {
        let diff = {'easy':1, 'medium':2, 'hard':3}[this.state.difficulty];
        const url = window.location.origin + `/sudoku/api?difficulty=${diff}`;
        // const url = `https://api.codetabs.com/v1/proxy/?quest=http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${diff}`;
        const squareVals = JSON.parse(JSON.stringify(this.state.squareValues)); 
        const initialVals = JSON.parse(JSON.stringify(this.state.initialSquares)); 

        let response = await fetch(url);
        let boardValues = await response.json();
        for (var i = 0, len = boardValues.squares.length; i < len; i++) {
            let x = boardValues.squares[i].x;
            let y = boardValues.squares[i].y;

            let {squareNum, cellNum} = this.xyToLocation(x, y);
            squareVals[squareNum][cellNum] = String(boardValues.squares[i].value);
            initialVals[squareNum][cellNum] = true;
        }

        this.setState({
            squareValues: squareVals,
            initialSquares: initialVals,
            });
    }



    update(squareNum, cellNum, cellVal) {
        if(this.state.initialSquares[squareNum][cellNum] == false) {
            const squareVals = JSON.parse(JSON.stringify(this.state.squareValues)); 


            squareVals[squareNum][cellNum] = cellVal; 

            if( this.checkValidity(squareVals, squareNum, cellNum, cellVal) ) {
                this.setState({squareValues: squareVals}); 
                this.checkComplete(squareVals, squareNum, cellNum, cellVal); 

                this.previousStates.push(this.state);
            }
        }
    }

    clear(callback) {
        this.setState({
            squareValues : Array(9).fill(Array(9).fill('')),
            completedSquares : Array(9).fill(Array(9).fill(false)),
            initialSquares : Array(9).fill(Array(9).fill(false)),
            victory: false
        },
        callback); 
    }

    newGame() {
        this.clear(this.getGame);
    }

    checkValidity(allVals, squareNum, cellNum, cellVal) {
        let validArrangement = true; 


        let rowNumber = this.getRowNumber(squareNum, cellNum);
        let columnNumber = this.getColumnNumber(squareNum, cellNum);

        // Check for duplicates in square
        // Check for duplicates in row
        // Check for duplicates in column
        if(
            !this.checkGroupingValidity(allVals[squareNum]) 
            || !this.checkGroupingValidity(this.getRowValues(allVals, rowNumber))
            || !this.checkGroupingValidity(this.getColumnValues(allVals, columnNumber))
        ) { 
            validArrangement = false; 
        }

        return validArrangement;
    }


    getRowNumber(squareNum, cellNum){
        return Math.floor(squareNum / 3) * 3 + Math.floor(cellNum / 3);
    }

    getColumnNumber(squareNum, cellNum){
        return ((squareNum%3)*3) + (cellNum%3); 
    }

    checkGroupingValidity(groupValuesArray){
        let valuesArray = groupValuesArray.filter( (val) => {return val !== ''} ); 
        return new Set(valuesArray).size === valuesArray.length;
    }

    checkComplete(allVals, squareNum, cellNum, cellVal) {
        // make copy of current state
        let completed =  Array(9).fill(Array(9).fill(false));

        let completedSquares = [];
        let completedRows = [];
        let completedColumns = [];

        // Iterate through every row, column, and square, and find
        // any that are completed

        for(var i=0; i < 9; i++) {
            // check squares
            let squareVals = allVals[i].filter((val) => {return val !== ''})
            if (squareVals.length === 9){ 
                completedSquares.push(i);
            }

            // check rows
            let rowVals = this.getRowValues(allVals, i)
                .filter((val) => {return val !== ''});
            if (rowVals.length === 9){
                completedRows.push(i);
            }

            // check columns
            let columnVals = this.getColumnValues(allVals, i)
                .filter((val) => {return val !== ''});
            if (columnVals.length === 9){
                completedColumns.push(i);
            }
        }

        for(i=0; i < completedSquares.length; i++) { 
            let sq = completedSquares[i];
            completed[sq] = completed[sq].map(x => true);
        }

        for(i=0; i < completedRows.length; i++) { 
            let rowNumber = completedRows[i];
            completed = JSON.parse(
                JSON.stringify(
                    this.setRowValues(completed, rowNumber, true)
                )); 
        } 

        for(i=0; i < completedColumns.length; i++) { 
            let columnNumber = completedColumns[i];
            completed = JSON.parse(
                JSON.stringify(
                    this.setColumnValues(completed, columnNumber, true)
                )); 
        }

        // check if game was won
        let victory;
        if(!completed.some(row => row.includes(false))){
            victory = true
        }
        else{
            victory = false
        }

        this.setState({
            completedSquares: completed,
            victory: victory
            });
    }

    getRowValues(allVals, rowNumber) {

        let row = Array(9);
        // iterate through squares that contain a given row
        for(let sq = Math.floor(rowNumber/3)*3, i=0; i<3; sq++, i++)
        {
            // iterate through cells in each square for a given row 
            let offset = rowNumber%3;
            for(let c=offset*3, j=0; j<3; c++, j++)
            {
                row[(i*3)+j] = allVals[sq][c];
            }
        } 

        return row; 
    }

    getColumnValues(allVals, columnNumber) {

        let column = Array(9);
        for(let sq=Math.floor(columnNumber/3), i=0; i<3; i++, sq+=3){
            for(let c=columnNumber%3, j=0; j<3; j++, c +=3){
                column[(i*3)+j] = allVals[sq][c]; 
            } 
        }

        return column;
    }

    setRowValues(allVals, rowNumber, newValue) {
        let values = JSON.parse(JSON.stringify(allVals));

        // iterate through squares that contain a given row
        for(let sq = Math.floor(rowNumber/3)*3, i=0; i<3; sq++, i++)
        {
            // iterate through cells in each square for a given row 
            let offset = rowNumber%3;
            for(let c=offset*3, j=0; j<3; c++, j++)
            {
                values[sq][c] = newValue;
            }
        } 
        return values;
    }

    setColumnValues(allVals, columnNumber, newValue) {
        let values = JSON.parse(JSON.stringify(allVals));

        for(let sq=Math.floor(columnNumber/3), i=0; i<3; i++, sq+=3){
            for(let c=columnNumber%3, j=0; j<3; j++, c +=3){
                values[sq][c] = newValue;
            } 
        }
        return values;
    }

    xyToLocation (x, y) {
        // convert a pair of x, y coordinates to square num, cell num representation
        // in order to be consistent with the structure of this.state
        let squareNum = Math.floor(x/3)*3 + Math.floor(y/3);

        let cellNum = (x % 3)*3 + (y % 3);

        return { squareNum, cellNum }; 
    }


    undo () {
        this.setState(this.previousStates.pop()); 
    }

    onDifficultyChange(event) {
        this.setState({difficulty: event.target.value});
    }

    render() {
        return(
        <>

    <div className="container ">
    <div className="controls ">
        <button onClick={() => this.newGame()}>New Game</button>
        <button id="undo-button" onClick={() => this.undo()}>Undo</button>

        <div className="difficulty-radio-buttons " onChange={this.onDifficultyChange}>

            <label>
            <input type="radio" value="easy" name="difficulty" 
                checked={this.state.difficulty === 'easy'} /> Easy
            </label>

            <label>
            <input type="radio" value="medium" name="difficulty" 
                checked={this.state.difficulty === 'medium'} /> Medium
            </label>

            <label>
            <input type="radio" value="hard" name="difficulty" 
                checked={this.state.difficulty === 'hard'} /> Hard
            </label>
            
        </div>
    </div>



    <div className="board " >
    <Board 
        squareValues={this.state.squareValues}
        completedSquares={this.state.completedSquares}
        initialSquares={this.state.initialSquares}
        difficulty ={this.state.difficulty}
        victory={this.state.victory}
        update={(sq, cell, val) => this.update(sq, cell, val)}
            />
    </div>
    </div>

        </>
            )
    }

}


import React, { Component } from "react"
import Square from './Square'
import './Board.css'

import Confetti from 'react-confetti';




export default class Board extends Component {

    render() {
        return(
        <>

    <div className="board " >
    <div id={this.props.victory ? "victory": ""}>
            <div className="board-row">
                <Square contents={this.props.squareValues[0]} completed={this.props.completedSquares[0]} update={(cell, val) => this.props.update(0, cell, val)}/>
                <Square contents={this.props.squareValues[1]} completed={this.props.completedSquares[1]} update={(cell, val) => this.props.update(1, cell, val)}/>
                <Square contents={this.props.squareValues[2]} completed={this.props.completedSquares[2]} update={(cell, val) => this.props.update(2, cell, val)}/>
            </div>                                                                                    
                                                                                                      
            <div className="board-row">                                                               
                <Square contents={this.props.squareValues[3]} completed={this.props.completedSquares[3]} update={(cell, val) => this.props.update(3, cell, val)}/>
                <Square contents={this.props.squareValues[4]} completed={this.props.completedSquares[4]} update={(cell, val) => this.props.update(4, cell, val)}/>
                <Square contents={this.props.squareValues[5]} completed={this.props.completedSquares[5]} update={(cell, val) => this.props.update(5, cell, val)}/>
            </div>                                                                                    
                                                                                                      
            <div className="board-row">                                                               
                <Square contents={this.props.squareValues[6]} completed={this.props.completedSquares[6]} update={(cell, val) => this.props.update(6, cell, val)}/>
                <Square contents={this.props.squareValues[7]} completed={this.props.completedSquares[7]} update={(cell, val) => this.props.update(7, cell, val)}/>
                <Square contents={this.props.squareValues[8]} completed={this.props.completedSquares[8]} update={(cell, val) => this.props.update(8, cell, val)}/>
            </div>
            </div>

            {this.props.victory ? 
                <div>

                <Confetti 
                    numberOfPieces={500}
                    friction={0.99}
                    gravity={0.1}
                    initialVelocityY={{min:5, max:10}}
                    recycle={false} 
                />


                <div className="victory-text">
                    <h1 id="left-emoji" >🥳</h1> <h1>You win</h1> <h1 id="right-emoji">🥳</h1>
                </div>
                </div>
            : <br/> }

        </div>

        </>
            )
    }

}


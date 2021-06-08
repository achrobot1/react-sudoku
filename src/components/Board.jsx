import React, { Component } from "react"
import Square from './Square'
import './Board.css'

import Confetti from 'react-confetti';




export default class Board extends Component {

    render() {
        const rowComponents = []

        for(var i=0; i<3; i++) { 
                rowComponents.push(
                <div className="board-row">
                    {[0,1,2].map((offset) => {
                        var idx = i*3 + offset;
                        return <Square
                            contents={this.props.squareValues[idx]} 
                            initial={this.props.initialSquares[idx]} 
                            completed={this.props.completedSquares[idx]} 
                            update={(cell, val) => this.props.update(idx, cell, val)} 
                        /> 
                    })}

                </div>
                );
        }




        return(
        <>

    <div className="board " >
    <div id={this.props.victory ? "victory": ""}>

        {rowComponents}

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
                    <h1 id="left-emoji" >🥳</h1> <h1>You win!</h1> <h1 id="right-emoji">🥳</h1>
                </div>
                </div>
            : <br/> }

        </div>

        </>
            )
    }

}


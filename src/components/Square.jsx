import React, {Component} from "react"
import './Square.css';
import Cell from './Cell';

export default class Square extends Component {

    updateCell(cellNum, value){
	this.props.update(cellNum, value); 
    }

    render() {
	return(
	    <>
	    <div className="square-container">

	    <div className="square-row">
		<Cell value={this.props.contents[0]} completed={this.props.completed[0]} update={(value) => this.updateCell(0, value)}/>
		<Cell value={this.props.contents[1]} completed={this.props.completed[1]} update={(value) => this.updateCell(1, value)}/>
		<Cell value={this.props.contents[2]} completed={this.props.completed[2]} update={(value) => this.updateCell(2, value)}/>
	    </div>                                                                    
                                                                                      
	    <div className="square-row">                                              
		<Cell value={this.props.contents[3]} completed={this.props.completed[3]} update={(value) => this.updateCell(3, value)}/>
		<Cell value={this.props.contents[4]} completed={this.props.completed[4]} update={(value) => this.updateCell(4, value)}/>
		<Cell value={this.props.contents[5]} completed={this.props.completed[5]} update={(value) => this.updateCell(5, value)}/>
	    </div>                                                                    
                                                                                      
	    <div className="square-row">                                              
		<Cell value={this.props.contents[6]} completed={this.props.completed[6]} update={(value) => this.updateCell(6, value)}/>
		<Cell value={this.props.contents[7]} completed={this.props.completed[7]} update={(value) => this.updateCell(7, value)}/>
		<Cell value={this.props.contents[8]} completed={this.props.completed[8]} update={(value) => this.updateCell(8, value)}/>
	    </div>

	    </div>

	    </>
	    )
    }
}

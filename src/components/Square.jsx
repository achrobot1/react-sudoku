import React, {Component} from "react"
import './Square.css';
import Cell from './Cell';

export default class Square extends Component {

    updateCell(cellNum, value){
	this.props.update(cellNum, value); 
    }

    render() {
	const cellComponents = [];
        for(var i=0; i<3; i++) { 
            cellComponents.push(
            <div className="square-row">
                {[0,1,2].map((offset) => {
                    var idx = i*3 + offset;
                    return <Cell
                                value={this.props.contents[idx]} 
                                completed={this.props.completed[idx]} 
                                initial={this.props.initial[idx]}
                                update={(value) => this.updateCell(idx, value)}
                            />
                })}

            </div>
            );
	}


	return(
	    <>


	    <div className="square-container">

            {cellComponents}

	    </div>

	    </>
	    )
    }
}

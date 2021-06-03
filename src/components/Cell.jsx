import React, { Component} from 'react'
import './Cell.css';


export default class Cell extends Component {

    onChange = (e) => {
        const v = e.target.value.replace(/\D/g, "");
        this.props.update(v);
    } 

    render() { 
        return(
                <div className="cell-div">
                    <input 
                        style={{backgroundColor: this.props.completed ? '#f2ffcc' : ''}}
                        className="cell-input" 
                        type="text" 
                        maxlength="1"
                        value={this.props.value}
                        onChange={this.onChange}
                    />
                </div>
              )
    }
}

import React, { Component } from "react";
import "../App.css";
import Load from './img/2_3_2.gif';
import ReactDOM from 'react-dom';
import LoadOrVis from './LoadOrVis';

class Loading extends Component {
  constructor() {
    super();
    this.state = {
      ip: []
    };
  }
  
componentDidMount() 

{ReactDOM.render(<LoadOrVis/>, document.getElementById('location'));}
    render() 
    {    
        return(
            <div className="App">
                <h1>
                    <p>Loading</p>
                    <p><img src={Load}/></p>
                    <div id="location"/>        
                </h1>
            </div>
        )

    }
   

}



export default Loading;
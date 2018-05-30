import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Loading from './Loading';
import LoadOrVis from './LoadOrVis';
import Page from './Page';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';

var T;
class ReRender extends Component {
  componentMount() {
  }
  render ()
  {
      return (
              <p><button
                                onClick={() => 
                                    {   
                                        localStorage.clear();
                                        ReactDOM.render(<Loading/>, document.getElementById('root'));
                                        console.log('СБРОС');
                                    }
                                }
                            >
                            reset/сброс
                            </button></p> 
  )
}}



export default ReRender ;
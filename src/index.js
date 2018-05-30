import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loading from './components/Loading';
import Form from './components/Form';
import LoadOrVis from './components/LoadOrVis';
import Page from './components/Page';
import Menu from './components/Menu';
import ReRender from './components/rerender';
import registerServiceWorker from './components/registerServiceWorker';
var T;
ReactDOM.render(<Loading/>, document.getElementById('root'));


//}
//else
//{
    
//ReactDOM.render(<Loading/>, document.getElementById('root'));
//}
registerServiceWorker();

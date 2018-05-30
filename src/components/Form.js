import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import Load from './img/2_3_2.gif';
import ReactDOM from 'react-dom';
import Page from './Page';
import Menu from './Menu';
import ReRender from './rerender';


var log =0;
var IP = 0;
var Lat = 0;
var Lon = 0;
var Icon = 0;
var wind_dir = '';
var wind_kph =0;
var wind_mps =0;
var humidity = 0;
var temp_c = 0;
var pressure_mb = 0;
var feelslike_c =0;
var name = '';
var city =0;
var myAddress = [];
var myGeo = [];
var HomeLand = {};
var Citys = [{}];
var CitysButton = [{}];
var a_value = '';
var del =0;
var T;
var Ren=0;
const WALink = 'http://api.apixu.com/v1/current.json?key=b23bf5ab39554440bbd190824181605&q=';
const MALink = 'http://maps.google.com/maps/api/geocode/json?address=';
const IPLink = '//api.ipify.org?format=json';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0, ip: [], weatherData: [], geocity: [],
    };
  }
componentDidMount() 

{localStorage.removeItem("iter");
ReactDOM.render(<Page />, document.getElementById('weather'));
ReactDOM.render(<Menu />, document.getElementById('menu'));
ReactDOM.render(<ReRender />, document.getElementById('reset'));}    
  render() 
  {                              
    return (<div>
                    <Navbar>
                        <Navbar.Header>
                            <h1>Погода в {localStorage["city"]}</h1>
                        </Navbar.Header>
                    </Navbar>
                    <Grid>
                        <Row>
                            <Col md={4} sm={4} >
                                <h3>Select a city</h3>
                                <Nav  bsStyle="pills" id="menu" stacked/>
                                <div id="reset"/>
                            </Col>
                            <Col md={8} sm={8} id="weather"/>   
                        </Row>
                    </Grid>
                </div>)
        
    ; 
  }
  }

export default Form;

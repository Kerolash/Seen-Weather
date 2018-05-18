import React, { Component } from "react";
import "./App.css";

var GEO = 0;

var log =0;
var IP = 0;
var Lat = 0;
var Lon = 0
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0, ip: [], weatherData: [], geocity: [],
    };
  }
componentDidMount() 
{
    fetch('//api.ipify.org?format=json').then(res => res.json()).then(json => {
        this.setState({ ip: json });
        IP = this.state.ip.ip;
        this.setState({IP: IP}); 
            
            fetch('http://api.apixu.com/v1/current.json?key=b23bf5ab39554440bbd190824181605&q='+IP).then(res => res.json()).then(json => {
                this.setState({ weatherData: json });
                const weatherCurrent = this.state.weatherData.current;
                const weatherLocation = this.state.weatherData.location;

                wind_dir = weatherCurrent.wind_dir;
                wind_kph = weatherCurrent.wind_kph;
                wind_mps = parseInt((wind_kph*1000/3600)*100)/100;
                humidity = weatherCurrent.humidity;
                temp_c = weatherCurrent.temp_c;
                feelslike_c = weatherCurrent.feelslike_c;
                pressure_mb = weatherCurrent.pressure_mb;
                Lat = weatherLocation.lat;
                Lon = weatherLocation.lon;
                Icon = weatherCurrent.condition.icon;
                name = weatherCurrent.condition.text;

                this.setState({wind_dir: wind_dir}); 
                this.setState({wind_kph: wind_kph}); 
                this.setState({humidity: humidity}); 
                this.setState({temp_c: temp_c}); 
                this.setState({feelslike_c: feelslike_c}); 
                this.setState({pressure_mb: pressure_mb}); 
                this.setState({Lat: Lat}); 
                this.setState({Lon: Lon}); 
                this.setState({icon: Icon}); 
                this.setState({name: name}); 

                    fetch('http://maps.google.com/maps/api/geocode/json?latlng='+Lat+','+Lon+'&sensor=false').then(res => res.json()).then(json => {
                        this.setState({ geocity: json });  
                        const GEOCITY = this.state.geocity;
                        for (var i = 0; i < GEOCITY.results.length; i++) {
                            myAddress[i] = GEOCITY.results[i].address_components; } 
                        city =myAddress[0][2].long_name;
                        this.setState({city: city}); 
                    });     
              });
    });
}
  render() {
    if (!GEO)
    {
        if ("geolocation" in navigator) 
        {
          console.log('geolocation is available');
          GEO=1;
        } 
        else 
        {
           console.log('geolocation IS NOT available');
        }
    }
    if (Icon !== 0 && city !== 0)
    {
        console.log('------------------------------------------');
        console.log('icon: '+Icon);
        console.log('ip: '+IP);
        console.log('lat: '+Lat);
        console.log('lon: '+Lon);
        console.log('city: '+city);
        console.log('wind_dir: '+wind_dir);
        console.log('wind_kph: '+wind_kph);
        console.log('wind_mps: '+wind_mps);
        console.log('humidity: '+humidity);
        console.log('temp_c: '+temp_c);
        console.log('feelslike_c: '+feelslike_c);
        console.log('pressure_mb: '+pressure_mb);
        console.log('name: '+name);
        log=1;
    }
return (
       <div className="App" >
              <h1>
                {name} in {city}
                <img src={Icon} alt={name} />
              </h1>
              <p>Current temp / Текущая температура: {temp_c} C°</p>
              <p>Feels / Ощущается: {feelslike_c} C°</p>
              <p>Pressure / Давление: {pressure_mb}</p>
              <p>Wind Direction / Направление ветра: {wind_dir}</p>
              <p>Wind Speed / Скорость ветра: {wind_mps} m/sec</p>
              <p>Humidity / Влажность: {humidity}</p>
        </div>)
        };
  }
export default App;
import React, { Component } from "react";
import "./App.css";

var GEO = 0;

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
const WALink = 'http://api.apixu.com/v1/current.json?key=b23bf5ab39554440bbd190824181605&q=';
const MALink = 'http://maps.google.com/maps/api/geocode/json?address=';
const IPLink = '//api.ipify.org?format=json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0, ip: [], weatherData: [], geocity: [],
    };
  }
componentDidMount() 

{   
    
    var returnObj = JSON.parse(localStorage.getItem("home"));
    
    if (returnObj !== null){
        Citys = JSON.parse(localStorage.getItem("CitysSave"));
        console.log('localStorage load complite');
        fetch(WALink+returnObj.Lat+'+'+returnObj.Lon).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
            const weatherCurrent = this.state.weatherData.current;
            const weatherLocation = this.state.weatherData.location;
            PARametrs (weatherCurrent,weatherLocation);
            city = returnObj.city;
            this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});
            
            
      
        });
        for (var i = 0; i < Citys.length; i++) {
                                CitysButton[i] = Citys[i];  
                            }
                            this.setState({CitysButton:CitysButton});
    }
    else{
        console.log('localStorage not found');
        console.log('start location search');
        fetch(IPLink).then(res => res.json()).then(json => {
            this.setState({ ip: json });
            IP = this.state.ip.ip;
            this.setState({IP: IP}); 

                fetch(WALink+IP).then(res => res.json()).then(json => {
                    this.setState({ weatherData: json });
                    const weatherCurrent = this.state.weatherData.current;
                    const weatherLocation = this.state.weatherData.location;
                    PARametrs (weatherCurrent,weatherLocation);
                    this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});
            

                        fetch(MALink+Lat+','+Lon+'&sensor=false').then(res => res.json()).then(json => {
                            this.setState({ geocity: json });  
                            const GEOCITY = this.state.geocity;
                            for (var i = 0; i < GEOCITY.results.length; i++) {
                                myAddress[i] = GEOCITY.results[i].address_components; } 
                            city =myAddress[0][2].long_name;
                            this.setState({city: city}); 

                            HomeLand["city"]=city;
                            HomeLand["Lat"]=Lat;
                            HomeLand["Lon"]=Lon;
                            var serialObj = JSON.stringify(HomeLand);
                            localStorage.setItem('home', serialObj);
                            Citys[0] =HomeLand;
                            var CitysSave = JSON.stringify(Citys);
                            localStorage.setItem('CitysSave', CitysSave);
                            Citys = JSON.parse(localStorage.getItem("CitysSave"));
                            for (i = 0; i < Citys.length; i++) {
                                CitysButton[i] = Citys[i];  
                            }
                            this.setState({CitysButton:CitysButton});
                        });     
                });
        });
    }    
}
  render() 
  {
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
    if (Icon !== 0 && city !== 0 && log ===0 )
    {
        ConsolLog ();
        log=1;
    }
    if(city !== 0) 
    {   return (
        <div className="App" >
            City / Город: 
            <input type="text" id="txt" onChange={() =>{a_value=document.getElementById("txt").value;}}/>
                <button onClick={() =>
                {fetch(MALink+a_value).then(res => res.json()).then(json => {
                    this.setState({ geocity: json });  
                    const GEOCITY = this.state.geocity;
                    for (var i = 0; i < GEOCITY.results.length; i++) {
                        myAddress[i] = GEOCITY.results[i].address_components; } 
                    city =myAddress[0][0].long_name;
                    this.setState({city: city});
                    
                    for (i = 0; i < GEOCITY.results.length; i++) {
                        myGeo[i] = GEOCITY.results[i].geometry.location; }    
                    Lat = myGeo[0].lat;
                    Lon = myGeo[0].lng;
                    this.setState({Lat: Lat});
                    this.setState({Lon: Lon});

                    HomeLand["city"]=city;
                    HomeLand["Lat"]=Lat;
                    HomeLand["Lon"]=Lon;
                    for (i=0; i<Citys.length; i++)
                        {
                            var er =0;
                            if (Citys[i].city === HomeLand.city)
                                {
                                    er=1;
                                }
                        }
                        if (er===0)
                        {
                                Citys.push(HomeLand);
                                var CitysSave = JSON.stringify(Citys);
                                localStorage.setItem('CitysSave', CitysSave);
                                Citys = JSON.parse(localStorage.getItem("CitysSave"));
                                for (i = 0; i < Citys.length; i++) {
                                CitysButton[i] = Citys[i];  
                            }
                            this.setState({CitysButton:CitysButton});
                            
                        }     
                    fetch(WALink+Lat+'+'+Lon).then(res => res.json()).then(json => {
                        this.setState({ weatherData: json });
                        const weatherCurrent = this.state.weatherData.current;
                        const weatherLocation = this.state.weatherData.location;
                        PARametrs (weatherCurrent,weatherLocation);
                        this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});
                        ConsolLog ();
                    });
                });
                document.getElementById("txt").value='';}}
                >
                Enter
                </button>
               
                <p>{CitysButton.map
                        ((City, id) => 
                            (
                                    <button
                                        key ={id}
                                        onClick={() => 
                                            {   
                                                Lat=City.Lat;
                                                city=City.city;
                                                Lon=City.Lon;
                                                fetch(WALink+Lat+'+'+Lon).then(res => res.json()).then(json => {
                                                    this.setState({ weatherData: json });
                                                    const weatherCurrent = this.state.weatherData.current;
                                                    const weatherLocation = this.state.weatherData.location;
                                                    PARametrs (weatherCurrent,weatherLocation)
                                                    this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});
                                                    ConsolLog ();   
                                                });
                                            }
                                        }
                                    >
                                    {City.city}
                                    </button>
                            )
                        )
                    }
                </p>
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
                <button
                    onClick={() => 
                        {   
                            localStorage.clear()  
                        }
                    }
                >
                reset/сброс
                </button>
        </div>
        )
    }
    else{return(<div className="App"><h1>Loading</h1></div>)}
        
  }
  }
function ConsolLog () {
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
}

function PARametrs (weatherCurrent,weatherLocation) {
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
}

export default App;
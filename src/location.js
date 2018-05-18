import React, { Component } from "react";
import "./App.css";
//import YMaps from 'react-yandex-maps';


const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
 // { name: "Барнаул", zip: "1510853" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
     iP: [], city: []
    };
  }
  componentDidMount() {
 fetch('//api.ipify.org?format=json').then(res => res.json()).then(json => {
      this.setState({ iP: json });
    });
   fetch('//api.sypexgeo.net/json/').then(res => res.json()).then(json => {
     this.setState({ city: json });
      
    });  

    
  }
  render() {
  const city1 = this.state.city;
  console.log(city1);
   if (!city1) return <div>Loading</div>;
      const ipAdres=this.state.iP;
      const ipAdress=ipAdres.ip
    return (
      <div>
        <h1>
        </h1>

                <p>{ipAdress}</p>
               
      </div>
    );
  }
}

class location extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="location">
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </button>
        ))}
</div>
    );
  }
}

export default location;
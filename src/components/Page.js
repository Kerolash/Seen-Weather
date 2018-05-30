import React, { Component } from "react";


class Page extends Component {
    render() 
    {        
        return(
                <div>
            <h1>
                {localStorage["name"]}  
                <img src={localStorage["Icon"]} alt={localStorage["name"]} />
            </h1>
            <p>Current temp / Текущая температура: {localStorage["temp_c"]} C°</p>          
            <p>Feels / Ощущается: {localStorage["feelslike_c"]} C°</p>                      
            <p>Pressure / Давление: {localStorage["pressure_mb"]}</p>                       
            <p>Wind Direction / Направление ветра: {localStorage["wind_dir"]}</p>           
            <p>Wind Speed / Скорость ветра: {localStorage["wind_mps"]} m/sec</p>           
            <p>Humidity / Влажность: {localStorage["humidity"]}</p>                         
        </div>)
        
    }
}


export default Page;
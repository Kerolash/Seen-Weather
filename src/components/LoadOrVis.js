
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import Load from './img/2_3_2.gif'
import ReactDOM from 'react-dom';
import Form from './Form';



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
var CitysButton = [{}];
var a_value = '';
var del =0;
var T;
var Ren=0;
 var Citys = [{}];
const WALink = 'http://api.apixu.com/v1/current.json?key=b23bf5ab39554440bbd190824181605&q=';
const MALink = 'http://maps.google.com/maps/api/geocode/json?address=';
const IPLink = '//api.ipify.org?format=json';

class LoadOrVis extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0, ip: [], weatherData: [], geocity: [],
    };
  }
componentDidMount() 

{  if (localStorage["home"] !== T && localStorage["home"] !== null){
        var returnObj = JSON.parse(localStorage["home"]); //проверяем наличие сохраненных данных о местоположении на устройстве

        Citys = JSON.parse(localStorage["CitysSave"]); //если данные есть
        console.log('localStorage load complite');  //сообщаем, что данные найдены
        fetch(WALink+returnObj.Lat+'+'+returnObj.Lon).then(res => res.json()).then(json => { //используя сохраненные геоданные
            this.setState({ weatherData: json });
            const weatherCurrent = this.state.weatherData.current;          //разбираем полученный json на нужные куски
            const weatherLocation = this.state.weatherData.location;        //разбираем полученный json на нужные куски
            localStorage['wind_dir']=weatherCurrent.wind_dir;                     //направление ветра
                    localStorage['wind_kph']=weatherCurrent.wind_kph;                     //скорость ветра в км/ч
                    localStorage['wind_mps']=parseInt((localStorage.getItem("wind_kph")*1000/3600)*100)/100;      //скорость ветра в м/с. расчет на основе скорости ветра в км/ч
                    localStorage['humidity']=weatherCurrent.humidity;                     //влажность
                    localStorage['temp_c']=weatherCurrent.temp_c;                         //реальная температура по цельсию
                    localStorage['feelslike_c']=weatherCurrent.feelslike_c;               //ощущаемая температура по цельсию
                    localStorage['pressure_mb']=weatherCurrent.pressure_mb;               //давление
                    localStorage['Lat']=weatherLocation.lat;                              //широта
                    localStorage['Lon']=weatherLocation.lon;                              //долгота
                    localStorage['Icon']=weatherCurrent.condition.icon;                   //ссылка на картинку, отображающую погоду
                    localStorage['name']=weatherCurrent.condition.text;                   //общее словесное описание погоды
                    localStorage['city'] = returnObj.city;                                          //разбираем полученный json на нужные куски
           
         if (localStorage["city"]!==T){
ReactDOM.render(<Form/>, document.getElementById('root'));}   
      
        });
}
    else{   //если сохраненных данных нет
        console.log('localStorage not found');                  //сообщаем, что сохранения нет
        console.log('start location search'); 
        console.log(this.state.ip.ip); //ищем местоположение
        
        for(var OP=0;   this.state.ip.ip===T && OP<=5 ; OP++)
        {
            fetch(IPLink).then(res => res.json()).then(json => {    //отправляем запрос на api, что бы получить IP адрес
                this.setState({ ip: json });                        //разбираем полученный json на нужные куски
                IP = this.state.ip.ip;                              //разбираем полученный json на нужные куски
                localStorage['IP']= IP;                            //разбираем полученный json на нужные куски
                if(this.state.ip.ip!==T && this.state.ip.ip!==0)
                {   
                    for(var OP=0;   localStorage["wind_dir"]===T  && OP!==5; OP++)
                    {
                        fetch(WALink+localStorage["IP"]).then(res => res.json()).then(json => {             //используя IP, отправляем запрос на api, что бы получить погоду по местонахождению
                            this.setState({ weatherData: json });                           //разбираем полученный json на нужные куски
                             
                            const weatherCurrent = this.state.weatherData.current;          //разбираем полученный json на нужные куски
                            const weatherLocation = this.state.weatherData.location;        //разбираем полученный json на нужные куски
                            localStorage['wind_dir']=weatherCurrent.wind_dir;                     //направление ветра
                            localStorage['wind_kph']=weatherCurrent.wind_kph;                     //скорость ветра в км/ч
                            localStorage['wind_mps']=parseInt((localStorage.getItem("wind_kph")*1000/3600)*100)/100;      //скорость ветра в м/с. расчет на основе скорости ветра в км/ч
                            localStorage['humidity']=weatherCurrent.humidity;                     //влажность
                            localStorage['temp_c']=weatherCurrent.temp_c;                         //реальная температура по цельсию
                            localStorage['feelslike_c']=weatherCurrent.feelslike_c;               //ощущаемая температура по цельсию
                            localStorage['pressure_mb']=weatherCurrent.pressure_mb;               //давление
                            localStorage['Lat']=weatherLocation.lat;                              //широта
                            localStorage['Lon']=weatherLocation.lon;                              //долгота
                            localStorage['Icon']=weatherCurrent.condition.icon;                   //ссылка на картинку, отображающую погоду
                            localStorage['name']=weatherCurrent.condition.text;                   //общее словесное описание погоды

                            if(weatherCurrent.wind_dir!==T)
                            { 
                                for(var OP=0;   localStorage['city']===T  && OP!==5; OP++)
                                {   
                                    fetch(MALink+localStorage["Lat"]+','+localStorage["Lon"]+'&sensor=false').then(res => res.json()).then(json => {        //используя геоданные из погоды, отправляем запрос на api
                                        this.setState({ geocity: json });               // и получаем название города (иногда точнее, чем по IP)
                                        const GEOCITY = this.state.geocity;             //разбираем полученный json на нужные куски
                                        for (var i = 0; i < GEOCITY.results.length; i++) {              //т.к. json большой и многоуровневый, вычленяем лишь нужные части
                                            myAddress[i] = GEOCITY.results[i].address_components; }     //т.к. json большой и многоуровневый, вычленяем лишь нужные части
                                        city =myAddress[0][2].long_name;                //получаем название города
                                        localStorage['city'] = city;                      //не знаю почему, но без этого не работает
                                        console.log(localStorage["city"]);
                                        HomeLand["city"]=localStorage["city"];              //сохраняем название города в объект
                                        HomeLand["Lat"]=localStorage["Lat"];                //сохраняем координату города в объект
                                        HomeLand["Lon"]=localStorage["Lon"];                //сохраняем координату города в объект
                                        var serialObj = JSON.stringify(HomeLand);           //делаем json из объект
                                        localStorage.setItem('home', serialObj);            //сохраняем json в localStorage
                                        
                                       Citys = [{}];
                                        Citys[0] =HomeLand;                                 //записываем объект в массив, что бы делать кнопки по названиям
                                        var CitysSave = JSON.stringify(Citys);              //делаем json из массива
                                        localStorage.setItem('CitysSave', CitysSave);       //сохраняем json в localStorage
                                        Citys = JSON.parse(localStorage.getItem("CitysSave")); 
                                        console.log(Citys);//перезаписываем объект из сохраненного json-a (без этого не работало)
                                    if (localStorage["city"]!==T){
ReactDOM.render(<Form/>, document.getElementById('root'));}});
                                }
                            }
                        });
                    }
                }
            });
        } 

    } 
    
}
  render() 
  { 

                                        
    return (<div>                </div>)
        
    
    }
  }

export default LoadOrVis;
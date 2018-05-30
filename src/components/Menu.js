import React, { Component } from "react";
import Load from './img/2_3_2.gif'
import {NavItem} from "react-bootstrap";
import ReactDOM from 'react-dom';
import Form from './Form';
import Page from './Page';

const MALink = 'http://maps.google.com/maps/api/geocode/json?address=';
const WALink = 'http://api.apixu.com/v1/current.json?key=b23bf5ab39554440bbd190824181605&q=';

var Citys =[{}];
var CitysButton =[{}];
var del =0;
var myAddress = [];
var myGeo = [];
var HomeLand = {};
var iter;

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      ip: []
    };
  }
  componentDiDMount() {
      
  }
    render() 
    {      if (localStorage["iter"] ===iter && localStorage.getItem("CitysSave")!==null){
            Citys = JSON.parse(localStorage.getItem("CitysSave"));     //перезаписываем объект из сохраненного json-a (без этого не работало)
                           CitysButton =[{}];
                            for (var i = 0; i < Citys.length; i++) {                //проходим по всему объекту
                                CitysButton[i] = Citys[i];                      //записывая все в объект для выведения кнопок (без этого не работало
                            }
                            localStorage['iter']="1";} 
        
        return(<div><p>
                                {CitysButton.map                                             //создаем кнопки по названиям городов, которые сохранены
                                    ((City, id) => 
                                        (       
                                                <NavItem 
                                                    key ={id}
                                                    onClick={() =>                          //когда кнопка будет нажата
                                                        {   
                                                            if(del === 0)                   //если обработка вызвана НЕ удалением
                                                            {
                                                                localStorage['Lat']=City.Lat;                   //принимаем координаты сохраненного города за текущие
                                                                localStorage['city']=City.city;                 //принимаем название сохраненного города за текущее
                                                                localStorage['Lon']=City.Lon;                   //принимаем координаты сохраненного города за текущие
                                                                fetch(WALink+localStorage["Lat"]+'+'+localStorage["Lon"]).then(res => res.json()).then(json => {                                                //используя координаты, отправляем запрос на api, что бы получить погоду по местонахождению
                                                                    this.setState({ weatherData: json });                                                                       //разбираем полученный json на нужные куски
                                                                    const weatherCurrent = this.state.weatherData.current;                                                      //разбираем полученный json на нужные куски
                                                                    const weatherLocation = this.state.weatherData.location;                                                    //разбираем полученный json на нужные куски
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
                                                              ReactDOM.render(<Form/>, document.getElementById('root'));                                                 //выводим данные погоды и локации для сверки
                                                              ReactDOM.render(<Page />, document.getElementById('weather'));   
                                                                });
                                                            }
                                                            else                            //если обработка вызвана удалением
                                                            {console.log('УДАЛЯЕМ!')
                                                                localStorage['Lat']=CitysButton[0].Lat;                   //принимаем координаты сохраненного города за текущие
                                                                localStorage['city']=CitysButton[0].city;                 //принимаем название сохраненного города за текущее
                                                                localStorage['Lon']=CitysButton[0].Lon;
                                                                console.log(localStorage['city'])//принимаем координаты сохраненного города за текущие
                                                                fetch(WALink+localStorage["Lat"]+'+'+localStorage["Lon"]).then(res => res.json()).then(json => {                                                //используя координаты, отправляем запрос на api, что бы получить погоду по местонахождению
                                                                    this.setState({ weatherData: json });                                                                       //разбираем полученный json на нужные куски
                                                                const weatherCurrent = this.state.weatherData.current;                                                      //разбираем полученный json на нужные куски
                                                                const weatherLocation = this.state.weatherData.location;                                                    //разбираем полученный json на нужные куски
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
                    ConsolLog ();           
                    ReactDOM.render(<Form/>, document.getElementById('root'));
                    ReactDOM.render(<Page />, document.getElementById('weather'));//выводим данные погоды и локации для сверки
                                                                });
                                                                del=0;
                                                            }
                                                        }
                                                    }
                                                >
                                                <button onClick={() =>
                                                    {
                                                        var j =0;
                                                        var i =0;
                                                        for (; i<Citys.length; i++)                              //проходя по всему массиву городов
                                                        {console.log(Citys[i].city)
                                                         if(Citys[i].city===City.city)                          //находим запись города относящуюся к кнопке
                                                         {
                                                             j=i;                                               //запоминаем ID
                                                         }
                                                        }
                                                        console.log('!!!!!!!');
                                                        CitysButton=[{}];
                                                        for (i = 0; i < Citys.length; i++)                      //перезаписываем массив объекток, откуда берем города для кнопок
                                                        {          
                                                            if(i<j){CitysButton[i] = Citys[i];}                 //пропуская тот, который удаляем
                                                            if(i>j){CitysButton[i-1] = Citys[i];}
                                                        }
                                                        
                                                        for (i=0; i<CitysButton.length; i++)                              //проходя по всему массиву городов
                                                        {console.log(CitysButton[i].city)}
                                                        var CitysSave = JSON.stringify(CitysButton);              //делаем json из массива
                                                        localStorage.setItem('CitysSave', CitysSave);       //сохраняем json в localStorage
                                                        Citys = JSON.parse(localStorage.getItem("CitysSave"));
                                                        del=1;                                              //метка сработавшего удаления
                                                    }
                                                }
                                                >
                                                -
                                                </button>
                                                {City.city}

                                                </NavItem> 

                                        )
                                    )
                                }
                            </p>
                            <input type="text" id="text" onChange={() =>{localStorage['a_value']=document.getElementById("text").value;}}/> 
                            <button onClick={() =>
                            {fetch(MALink+localStorage["a_value"]).then(res => res.json()).then(json => {   //получаем геоданные по названию города
                                this.setState({ geocity: json });                           
                                const GEOCITY = this.state.geocity;                         
                                for (var i = 0; i < GEOCITY.results.length; i++) {          //разбираем полученный json на нужные куски
                                    myAddress[i] = GEOCITY.results[i].address_components; } //разбираем полученный json на нужные куски
                                localStorage['city'] =localStorage["a_value"];                                              //изменяем название отображаемого города
                                
                                for (i = 0; i < GEOCITY.results.length; i++) {              //разбираем полученный json на нужные куски
                                    myGeo[i] = GEOCITY.results[i].geometry.location; }      //разбираем полученный json на нужные куски    
                                localStorage['Lat'] = myGeo[0].lat;                                         //получаем координату города
                                localStorage['Lon'] = myGeo[0].lng;                                         //получаем координату города
                                
                                HomeLand["city"]=localStorage["city"];                                      //сохраняем название города в объект
                                HomeLand["Lat"]=localStorage["Lat"];                                        //сохраняем координату города в объект
                                HomeLand["Lon"]=localStorage["Lon"];                                        //сохраняем координату города в объект
                                for (i=0; i<Citys.length; i++)                              //проходя по всему массиву городов
                                    {
                                        var er =0;
                                        if (Citys[i].city === HomeLand.city)                //проверяем, нет ли уже такого
                                            {
                                                er=1;
                                            }
                                    }
                                    if (er===0)                                             //если такого еще нет
                                    {
                                        Citys.push(HomeLand);                               //записываем объект в массив, что бы делать кнопки по названиям
                                        var CitysSave = JSON.stringify(Citys);              //делаем json из массива
                                        localStorage.setItem('CitysSave', CitysSave);       //сохраняем json в localStorage
                                        Citys = JSON.parse(localStorage.getItem("CitysSave"));     //перезаписываем объект из сохраненного json-a (без этого не работало)
                                        for (i = 0; i < Citys.length; i++) {                //проходим по всему объекту
                                            CitysButton[i] = Citys[i];                      //записывая все в объект для выведения кнопок (без этого не работало
                                        }
                                        this.setState({CitysButton:CitysButton});           //не знаю почему, но без этого не работает

                                    }     
                                fetch(WALink+localStorage["Lat"]+'+'+localStorage["Lon"]).then(res => res.json()).then(json => {                                                //используя координаты, отправляем запрос на api, что бы получить погоду по местонахождению
                                    this.setState({ weatherData: json });                                                                       //разбираем полученный json на нужные куски
                                    const weatherCurrent = this.state.weatherData.current;                                                      //разбираем полученный json на нужные куски
                                    const weatherLocation = this.state.weatherData.location;                                                    //разбираем полученный json на нужные куски
                                    localStorage["wind_dir"]=weatherCurrent.wind_dir;                     //направление ветра
                    localStorage["wind_kph"]=weatherCurrent.wind_kph;                     //скорость ветра в км/ч
                    localStorage["wind_mps"]=parseInt((localStorage.getItem("wind_kph")*1000/3600)*100)/100;      //скорость ветра в м/с. расчет на основе скорости ветра в км/ч
                    localStorage["humidity"]=weatherCurrent.humidity;                     //влажность
                    localStorage["temp_c"]=weatherCurrent.temp_c;                         //реальная температура по цельсию
                    localStorage["feelslike_c"]=weatherCurrent.feelslike_c;               //ощущаемая температура по цельсию
                    localStorage["pressure_mb"]=weatherCurrent.pressure_mb;               //давление
                    localStorage["Lat"]=weatherLocation.lat;                              //широта
                    localStorage["Lon"]=weatherLocation.lon;                              //долгота
                    localStorage["Icon"]=weatherCurrent.condition.icon;                   //ссылка на картинку, отображающую погоду
                    localStorage["name"]=weatherCurrent.condition.text;                   //общее словесное описание погоды
                    ConsolLog ();                                                                                               //выводим данные погоды и локации для сверки
                     ReactDOM.render(<Form/>, document.getElementById('root'));
                     ReactDOM.render(<Page />, document.getElementById('weather'));//выводим данные погоды и локации для сверки
                                });
                            });
                            document.getElementById("text").value='';localStorage['UPDATE'] = 1;
                            for (var i = 0; i < Citys.length; i++) {                //проходим по всему объекту
                                CitysButton[i] = Citys[i];                      //записывая все в объект для выведения кнопок (без этого не работало
                            }
                            this.setState({CitysButton:CitysButton});
                            var CitysSave = JSON.stringify(CitysButton);              //делаем json из массива
                            localStorage.setItem('CitysSave', CitysSave);
                            localStorage['load']="1"; ReactDOM.render(<Form/>, document.getElementById('root'));
                     ReactDOM.render(<Page />, document.getElementById('weather'));}}                      //отчищаем поле ввода названия города
                            >
                            Add 
                            </button></div>)
    }

}


function ConsolLog () {                                                         //функция вывода текущих данных в консоль, для сверки
console.log('------------------------------------------');                      //отбивка
                        console.log('icon: '+ localStorage["Icon"]);                            //ссылка на иконку
                        console.log('ip: '+ localStorage["IP"]);                                 //IP пользователя, если вычислялось, иначе 0
                        console.log('lat: '+ localStorage["Lat"]);                               //широта, по которой будет выводиться погода
                        console.log('lon: '+ localStorage["Lon"]);                               //долгота, по которой будет выводиться погода
                        console.log('city: '+ localStorage["city"]);                             //название города, соответствующего координатам
                        console.log('wind_dir: '+ localStorage["wind_dir"]);                     //направление ветра
                        console.log('wind_kph: '+ localStorage["wind_kph"]);                    //скорость ветра в км/ч
                        console.log('wind_mps: '+ localStorage["wind_mps"]);                     //скорость ветра в м/с
                        console.log('humidity: '+ localStorage["humidity"]);                     //влажность. вероятно в процентах
                        console.log('temp_c: '+ localStorage["temp_c"]);                        //текущая температура в градусах цельсия
                        console.log('feelslike_c: '+ localStorage["feelslike_c"]);               //ощущаемая температура в градусах цельсия
                        console.log('pressure_mb: '+ localStorage["pressure_mb"]);               //давление. Не уверен в шкале.
                        console.log('name: '+ localStorage["name"]);                             //общее словесное описание погоды
}
export default Menu;
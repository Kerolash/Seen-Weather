import React, { Component } from "react";
import "./App.css";


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
    
    var returnObj = JSON.parse(localStorage.getItem("home")); //проверяем наличие сохраненных данных о местоположении на устройстве
    
    if (returnObj !== null){
        Citys = JSON.parse(localStorage.getItem("CitysSave")); //если данные есть
        console.log('localStorage load complite');  //сообщаем, что данные найдены
        fetch(WALink+returnObj.Lat+'+'+returnObj.Lon).then(res => res.json()).then(json => { //используя сохраненные геоданные
            this.setState({ weatherData: json });                       //получаем данные от api погоды 
            const weatherCurrent = this.state.weatherData.current;          //разбираем полученный json на нужные куски
            const weatherLocation = this.state.weatherData.location;        //разбираем полученный json на нужные куски
            PARametrs (weatherCurrent,weatherLocation);                     //разбираем полученный json на нужные куски
            city = returnObj.city;                                          //разбираем полученный json на нужные куски
            this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});       //не знаю почему, но без этого не работает
            
            
      
        });
        for (var i = 0; i < Citys.length; i++)                  //пробегаем по всему массиву с сохраненными данными о городах
        {
            CitysButton[i] = Citys[i];              
        }
        this.setState({CitysButton:CitysButton});               //не знаю почему, но без этого не работает
    }
    else{   //если сохраненных данных нет
        console.log('localStorage not found');                  //сообщаем, что сохранения нет
        console.log('start location search');                   //ищем местоположение
        fetch(IPLink).then(res => res.json()).then(json => {    //отправляем запрос на api, что бы получить IP адрес
            this.setState({ ip: json });                        //разбираем полученный json на нужные куски
            IP = this.state.ip.ip;                              //разбираем полученный json на нужные куски
            this.setState({IP: IP});                            //разбираем полученный json на нужные куски

                fetch(WALink+IP).then(res => res.json()).then(json => {             //используя IP, отправляем запрос на api, что бы получить погоду по местонахождению
                    this.setState({ weatherData: json });                           //разбираем полученный json на нужные куски
                    const weatherCurrent = this.state.weatherData.current;          //разбираем полученный json на нужные куски
                    const weatherLocation = this.state.weatherData.location;        //разбираем полученный json на нужные куски
                    PARametrs (weatherCurrent,weatherLocation);                     //разбираем полученный json на нужные куски
                    this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});               //не знаю почему, но без этого не работает
            

                        fetch(MALink+Lat+','+Lon+'&sensor=false').then(res => res.json()).then(json => {        //используя геоданные из погоды, отправляем запрос на api
                            this.setState({ geocity: json });               // и получаем название города (иногда точнее, чем по IP)
                            const GEOCITY = this.state.geocity;             //разбираем полученный json на нужные куски
                            for (var i = 0; i < GEOCITY.results.length; i++) {              //т.к. json большой и многоуровневый, вычленяем лишь нужные части
                                myAddress[i] = GEOCITY.results[i].address_components; }     //т.к. json большой и многоуровневый, вычленяем лишь нужные части
                            city =myAddress[0][2].long_name;                //получаем название города
                            this.setState({city: city});                     //не знаю почему, но без этого не работает

                            HomeLand["city"]=city;              //сохраняем название города в объект
                            HomeLand["Lat"]=Lat;                //сохраняем координату города в объект
                            HomeLand["Lon"]=Lon;                //сохраняем координату города в объект
                            var serialObj = JSON.stringify(HomeLand);           //делаем json из объект
                            localStorage.setItem('home', serialObj);            //сохраняем json в localStorage
                            Citys[0] =HomeLand;                                 //записываем объект в массив, что бы делать кнопки по названиям
                            var CitysSave = JSON.stringify(Citys);              //делаем json из массива
                            localStorage.setItem('CitysSave', CitysSave);       //сохраняем json в localStorage
                            Citys = JSON.parse(localStorage.getItem("CitysSave"));     //перезаписываем объект из сохраненного json-a (без этого не работало)
                            for (i = 0; i < Citys.length; i++) {                //проходим по всему объекту
                                CitysButton[i] = Citys[i];                      //записывая все в объект для выведения кнопок (без этого не работало
                            }
                            this.setState({CitysButton:CitysButton});           //не знаю почему, но без этого не работает
                        });     
                });
        });
    }    
}
  render() 
  {
    if (Icon !== 0 && city !== 0 && log ===0 ) //ограничение количества выводов при рендере
    {
        ConsolLog (); //выводим данные погоды и локации для сверки
        log=1; //метка невхода в данное условие
    }
    if(city !== 0)  //при условии наличия данных
    {   return (    //выводим
        <div className="App" >
            City / Город: 
            <input type="text" id="txt" onChange={() =>{a_value=document.getElementById("txt").value;}}/> {/*поле ввода города*/}
                <button onClick={() =>
                {fetch(MALink+a_value).then(res => res.json()).then(json => {   //получаем геоданные по названию города
                    this.setState({ geocity: json });                           //разбираем полученный json на нужные куски
                    const GEOCITY = this.state.geocity;                         //разбираем полученный json на нужные куски
                    for (var i = 0; i < GEOCITY.results.length; i++) {          //разбираем полученный json на нужные куски
                        myAddress[i] = GEOCITY.results[i].address_components; } //разбираем полученный json на нужные куски
                    city =a_value;                                              //изменяем название отображаемого города
                    this.setState({city: city});                                //не знаю почему, но без этого не работает
                    
                    for (i = 0; i < GEOCITY.results.length; i++) {              //разбираем полученный json на нужные куски
                        myGeo[i] = GEOCITY.results[i].geometry.location; }      //разбираем полученный json на нужные куски    
                    Lat = myGeo[0].lat;                                         //получаем координату города
                    Lon = myGeo[0].lng;                                         //получаем координату города
                    this.setState({Lat: Lat});                                  //не знаю почему, но без этого не работает
                    this.setState({Lon: Lon});                                  //не знаю почему, но без этого не работает

                    HomeLand["city"]=city;                                      //сохраняем название города в объект
                    HomeLand["Lat"]=Lat;                                        //сохраняем координату города в объект
                    HomeLand["Lon"]=Lon;                                        //сохраняем координату города в объект
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
                    fetch(WALink+Lat+'+'+Lon).then(res => res.json()).then(json => {                                                //используя координаты, отправляем запрос на api, что бы получить погоду по местонахождению
                        this.setState({ weatherData: json });                                                                       //разбираем полученный json на нужные куски
                        const weatherCurrent = this.state.weatherData.current;                                                      //разбираем полученный json на нужные куски
                        const weatherLocation = this.state.weatherData.location;                                                    //разбираем полученный json на нужные куски
                        PARametrs (weatherCurrent,weatherLocation);                                                                 //разбираем полученный json на нужные куски
                        this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});       //не знаю почему, но без этого не работает
                        ConsolLog ();                                                                                               //выводим данные погоды и локации для сверки
                    });
                });
                document.getElementById("txt").value='';}}                      //отчищаем поле ввода названия города
                >
                Enter
                </button>
               
                <p>{CitysButton.map                                             //создаем кнопки по названиям городов, которые сохранены
                        ((City, id) => 
                            (
                                    <button
                                        key ={id}
                                        onClick={() =>                          //когда кнопка будет нажата
                                            {   
                                                Lat=City.Lat;                   //принимаем координаты сохраненного города за текущие
                                                city=City.city;                 //принимаем название сохраненного города за текущее
                                                Lon=City.Lon;                   //принимаем координаты сохраненного города за текущие
                                                fetch(WALink+Lat+'+'+Lon).then(res => res.json()).then(json => {                                                //используя координаты, отправляем запрос на api, что бы получить погоду по местонахождению
                                                    this.setState({ weatherData: json });                                                                       //разбираем полученный json на нужные куски
                                                    const weatherCurrent = this.state.weatherData.current;                                                      //разбираем полученный json на нужные куски
                                                    const weatherLocation = this.state.weatherData.location;                                                    //разбираем полученный json на нужные куски
                                                    PARametrs (weatherCurrent,weatherLocation);                                                                 //разбираем полученный json на нужные куски
                                                    this.setState({wind_dir, wind_kph, humidity, temp_c,feelslike_c,pressure_mb,Lat,Lon,Icon,name,city});       //не знаю почему, но без этого не работает
                                                    ConsolLog ();                                                                                               //выводим данные погоды и локации для сверки
                                                });
                                            }
                                        }
                                    >
                                    {City.city} {/*выводим название города, соответствующего кнопке*/}
                                    </button>
                            )
                        )
                    }
                </p>
                <h1>                                                            {/*выводим погоду и название города, которые сейчас отображаются, а так же рисунок*/}
                    {name} in {city} 
                    <img src={Icon} alt={name} />
                </h1>
                <p>Current temp / Текущая температура: {temp_c} C°</p>          {/*выводим текущую темературу*/}
                <p>Feels / Ощущается: {feelslike_c} C°</p>                      {/*выводим темературу, которая ощущается*/}
                <p>Pressure / Давление: {pressure_mb}</p>                       {/*выводим текущее давление*/}
                <p>Wind Direction / Направление ветра: {wind_dir}</p>           {/*выводим направление ветра в формате Nord-West = NW*/}
                <p>Wind Speed / Скорость ветра: {wind_mps} m/sec</p>            {/*выводим скорость ветра в м/с*/}
                <p>Humidity / Влажность: {humidity}</p>                         {/*выводим текущую влажность*/}
                <button
                    onClick={() => 
                        {   
                            localStorage.clear()                                /*создаем кнопку, нажатием на которую отчищается LocalStorage*/
                        }
                    }
                >
                reset/сброс
                </button>
        </div>
        )
    }
    else{return(<div className="App"><h1>Loading</h1></div>)}                   {/*если данных нет, выводим "Загрузка"*/}
        
  }
  }
function ConsolLog () {                                                         //функция вывода текущих данных в консоль, для сверки
console.log('------------------------------------------');                      //отбивка
                        console.log('icon: '+Icon);                             //ссылка на иконку
                        console.log('ip: '+IP);                                 //IP пользователя, если вычислялось, иначе 0
                        console.log('lat: '+Lat);                               //широта, по которой будет выводиться погода
                        console.log('lon: '+Lon);                               //долгота, по которой будет выводиться погода
                        console.log('city: '+city);                             //название города, соответствующего координатам
                        console.log('wind_dir: '+wind_dir);                     //направление ветра
                        console.log('wind_kph: '+wind_kph);                     //скорость ветра в км/ч
                        console.log('wind_mps: '+wind_mps);                     //скорость ветра в м/с
                        console.log('humidity: '+humidity);                     //влажность. вероятно в процентах
                        console.log('temp_c: '+temp_c);                         //текущая температура в градусах цельсия
                        console.log('feelslike_c: '+feelslike_c);               //ощущаемая температура в градусах цельсия
                        console.log('pressure_mb: '+pressure_mb);               //давление. Не уверен в шкале.
                        console.log('name: '+name);                             //общее словесное описание погоды
}

function PARametrs (weatherCurrent,weatherLocation) {                           //функция записи полученных данных в текущие
                        wind_dir = weatherCurrent.wind_dir;                     //направление ветра
                        wind_kph = weatherCurrent.wind_kph;                     //скорость ветра в км/ч
                        wind_mps = parseInt((wind_kph*1000/3600)*100)/100;      //скорость ветра в м/с. расчет на основе скорости ветра в км/ч
                        humidity = weatherCurrent.humidity;                     //влажность
                        temp_c = weatherCurrent.temp_c;                         //реальная температура по цельсию
                        feelslike_c = weatherCurrent.feelslike_c;               //ощущаемая температура по цельсию
                        pressure_mb = weatherCurrent.pressure_mb;               //давление
                        Lat = weatherLocation.lat;                              //широта
                        Lon = weatherLocation.lon;                              //долгота
                        Icon = weatherCurrent.condition.icon;                   //ссылка на картинку, отображающую погоду
                        name = weatherCurrent.condition.text;                   //общее словесное описание погоды
}

export default App;
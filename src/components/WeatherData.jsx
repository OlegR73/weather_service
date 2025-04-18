import { useState, useEffect } from "react";
import { useContext } from "react";
import { InputSelectContext } from '../context/InputSelectContext.jsx';
import QrCode from "./QRCode";
import "./Button/Button.css"; 


export default function WeatherData({message, weatherData, value}) {
    let dateTime =  new Date();
    // function HandleSubmit() {
    //     //console.log(weatherData.city + " - " + weatherData.temp + ' - ' + dateTime.toLocaleTimeString());
    //     const dataToStore = {x : dateTime.toLocaleTimeString(), y : weatherData.temp}
    //     localStorage.setItem(weatherData.city, JSON.stringify(dataToStore));
        
    // }
 
    return (
        <div className="weather_info">
            {weatherData ? (
                <div >
                    <p>{weatherData.city + " ( " + weatherData.country + " )"}</p>
                    <p>Temperature now: {weatherData.temp}°C </p>
                    <p>Feels like: {weatherData.feelsLike}°C</p>
                    <p>Description: {weatherData.description}</p>
                    {/* <button onClick={HandleSubmit} className="button" type="submit">Save data</button> */}
                    <QrCode value={weatherData.city}/>
                </div>
               
                ) : (
                    <p>{message}</p>
                )}
        </div>
    )
}

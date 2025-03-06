import { useState, useEffect } from "react";
import { useContext } from "react";
import { InputSelectContext } from '../context/InputSelectContext.jsx';


export default function WeatherData({message, setMessage, weatherData}) {

    return (
        <div>
            {weatherData ? (
                <div>
                    <p>{weatherData.city + " ( " + weatherData.country + " )"}</p>
                    <p>Temperature: {weatherData.temperature}°C </p>
                    <p>Feels like: {weatherData.feelsLike}°C</p>
                    <p>Description: {weatherData.description}</p>
                </div>
                ) : (
                    <p>{message}</p>
                )}
        </div>
    )
}

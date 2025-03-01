import { useState, useEffect } from "react";

export default function WeatherData({ currentCity, message, setMessage }) {
    const [weatherData, setwWeatherData] = useState(null);
    

    const apiKey = '2d271a197ce5aef1db71479108ed9538';


    useEffect(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
        setwWeatherData('');
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            }
            return response.json();
        })
        .then(data => {   
            setwWeatherData({
                "city" : data.name,
                "temperature" : Math.round(data.main.temp),
                "feelsLike" : Math.round(data.main.feels_like),
                "description" : data.weather[0].description,
                "country" : data.sys.country
            });
             setMessage("");
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setMessage('Incorrect input or network error.');
        })
    }, [currentCity, message]);

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

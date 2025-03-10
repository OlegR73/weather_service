import { useState, useEffect, useContext } from "react";
import { InputSelectContext } from "../context/InputSelectContext";
import ChartBox from "./ChartBox.jsx";
import WeatherData from "./WeatherData.jsx";



export default function WeatherContainer({ message, setMessage }) {
  const [weatherData, setwWeatherData] = useState(null);
  const { currentCity } = useContext(InputSelectContext);

  const apiKey = "2d271a197ce5aef1db71479108ed9538";

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
    setwWeatherData(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setwWeatherData({
          city: data.name,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          country: data.sys.country,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        });
        setMessage("");

        //console.log(data.coord);
        // console.log(data.coord.lat);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Incorrect input or network error.");
      });
  }, [currentCity, message]);

  return (
    <div className="weather-container">
      <section className="weather_box">
        <WeatherData
          message={message}
          setMessage={setMessage}
          weatherData={weatherData}
        />
      </section>
      <section className="chart_box">
        {weatherData ? (<ChartBox weatherData={weatherData} />) : (<p>Loading chart...</p>)}
      </section>
    </div>
  );
}

import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import WeatherData from "./WeatherData";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

async function fetchWeather(lat, long) {
  // let long = 24.105078;
  // let lat = 56.946285;

  const params = {
    latitude: lat,
    longitude: long,
    hourly: "temperature_2m",
    models: "icon_seamless",
  };

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly}&models=${params.models}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const timeArray = data.hourly.time;
    const temperatureArray = data.hourly.temperature_2m;

    const timeToDisplay = timeArray.filter((hour, index) => index % 4 === 0);
    const tempToDisplay = temperatureArray.filter((temp, index) => index % 4 === 0);


    return [timeToDisplay, tempToDisplay];
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export default function ChartBox({ weatherData }) {
  let temp = [];

  if (!WeatherData) {
    return <p>No weather data available</p>;
  }

  //let storedData = JSON.parse(localStorage.getItem(weatherData.city));

  useEffect(() => {
     async function getWeather() {
      const dataTempArr = await fetchWeather(weatherData.latitude, weatherData.longitude);
      console.log("Weather Data:", dataTempArr[0]);


      

     }
     getWeather();
  }, []);

  // console.log(weatherData.city + ": latitude - " + weatherData.latitude + ", longitude - " +  weatherData.longitude);
  //console.log("Weather Data:", dataTempArr[0]);

  switch (weatherData.city) {
    case "Rīga":
      temp = [0, 25, 22, 13, -19, 10, weatherData.temp];
      break;
    case "Ventspils":
      temp = [0, 25, 22, 13, 5, 10, weatherData.temp];
      break;
    case "Liepāja":
      temp = [7, 5, -2, 13, 21, 11, weatherData.temp];
      break;
    case "Tokyo":
      temp = [10, 25, 2, -13, -9, 10, weatherData.temp];
      break;
    case "Moscow":
      temp = [11, 2, 22, -3, -14, -10, weatherData.temp];
      break;
    case "Milan":
      temp = [10, 25, 17, 13, 19, 10, weatherData.temp];
      break;
    case "New York":
      temp = [1, 21, 2, 13, -1, 5, weatherData.temp];
      break;
    case "Osaka":
      temp = [1, 20, 9, 13, -9, 4, weatherData.temp];
      break;
    case "Athens":
      temp = [6, 7, 15, -13, 9, -10, weatherData.temp];
      break;
    case "Palermo":
      temp = [22, -5, 12, 13, 0, 1, weatherData.temp];
      break;
    default:
      temp = [0, 2, 3, 13, -19, 16, weatherData.temp];
      break;
  }

  const data = {
    labels: [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
      "2024-03-06",
      "2024-03-07",
      "2024-03-08",
    ],
    datasets: [
      {
        label: `Temperature in ${weatherData.city}`,
        data: temp,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuad",
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        min: -20,
        max: 40,
        ticks: {
          stepSize: 5,
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

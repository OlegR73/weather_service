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

    const timeToDisplay = timeArray.filter((hour, index) => index % 2 === 0);
    const tempToDisplay = temperatureArray.filter((temp, index) => index % 2 === 0);

    return [timeToDisplay, tempToDisplay];

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export default function ChartBox({ weatherData }) {
  const [chartData, setChartData] = useState(null);
  let temp = [];

  if (!weatherData) {
    return <p>No weather data available</p>;
  }

  //let storedData = JSON.parse(localStorage.getItem(weatherData.city));

  useEffect(() => {
    async function getWeather() {
      const fetchedData = await fetchWeather( weatherData.latitude, weatherData.longitude);
      const todayTime = fetchedData[0].slice(0, 13);
      const todayTemp = fetchedData[1].slice(0, 13);

      // const time_labels = [];
      // for (let i = 0; i < todayTime.length; i++) {
      //   time_labels.push(todayTime[i].substring(11));
      // }

       // console.log("todayTime:", time_labels);
      // console.log("todayTemp:", todayTemp);
     

      setChartData({
        labels: todayTime,
        datasets: [
          {
            label: `Temperature in ${weatherData.city} `,
            data: todayTemp,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    }
    getWeather();
  }, [weatherData]);

 

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
          unit: "hour",
        },
        ticks: {
          source: "data",
          autoSkip: true, // Показывает все временные метки
          maxRotation: 45, // Наклон подписей для удобства чтения
          minRotation: 0,
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

  return chartData ? <Line data={chartData} options={options} /> : <p>Loading chart data...</p>;
}

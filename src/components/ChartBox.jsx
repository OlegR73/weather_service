import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import  getInterval  from "../functions.js"
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

    // const timeArray = data.hourly.time;
    // const temperatureArray = data.hourly.temperature_2m;

    const timeToDisplay = data.hourly.time.filter((hour, index) => index % 2 === 0);
    const tempToDisplay = data.hourly.temperature_2m.filter((temp, index) => index % 2 === 0);

    return [timeToDisplay, tempToDisplay];

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export default function ChartBox({ weatherData, value }) {
 const [chartData, setChartData] = useState(null);
 let interval = [];
 let unit = 'hour';

 switch (value) {
  case 'Today':
    interval = [0, 13];
    unit = 'hour';
    break;

    case 'Tomorrow':
    interval = [12, 25];
    unit = 'hour';
    break;

    case 'ThreeDays':
    interval = [0, 37];
    unit = 'day'
    break;
 }

//  console.log("interval:", interval);
//  console.log("Value from App in ChartBox:", value);

  if (!weatherData) {
    return <p>No weather data available</p>;
  }

  //let storedData = JSON.parse(localStorage.getItem(weatherData.city));

  useEffect(() => {
    async function getWeather() {
      // console.log("interval:", interval);
      // console.log("Value from App in ChartBox:", value);

      const fetchedData = await fetchWeather( weatherData.latitude, weatherData.longitude);
  
      const todayTime = getInterval(fetchedData[0], interval[0], interval[1]);
      const todayTemp = getInterval(fetchedData[1], interval[0], interval[1]);
   


      // const time_labels = [];
      // for (let i = 0; i < todayTime.length; i++) {
      //   time_labels.push(todayTime[i].substring(11));
      // }

    //console.log("todayTime:", todayTime);
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
  }, [weatherData, value]);

 

  const options = {
    responsive: true,
    animation: {
      duration: 500,
      easing: "easeOutQuad",
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: unit,
        },
        ticks: {
          source: "data",
          autoSkip: true, 
          maxRotation: 45, 
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

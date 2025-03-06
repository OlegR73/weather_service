//import { useContext } from "react";
//import { InputSelectContext } from "../context/InputSelectContext";
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

export default function ChartBox({weatherData}) {
  let temp = [];

  if (!WeatherData) {
    return <p>No weather data available</p>;
  }

  if (weatherData.city == "Rīga") {
    temp = [0, 25, 22, 13, -19, 10, -4]
  }else{
    temp = [30, 25, 2, 1, -2, 0, -14];
  }
  console.log(temp + ' - ' + weatherData.city);


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
      easing: 'easeOutQuad', 
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

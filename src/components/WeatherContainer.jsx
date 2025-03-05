import ChartBox from "./ChartBox.jsx";
import WeatherData from "./WeatherData.jsx";


export default function WeatherContainer({ message, setMessage }) {
  return (
    <div className="weather-container">
      <section className="weather_box">
        <WeatherData message={message} setMessage={setMessage} />
      </section>
      <section className="chart_box">
         <ChartBox message={message} />
      </section>
    </div>
  )
}

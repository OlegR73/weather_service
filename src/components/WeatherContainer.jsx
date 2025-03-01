import WeatherData from "./WeatherData.jsx";

export default function WeatherContainer({ currentCity, message, setMessage }) {
  return (
    <div className="weather-container">
      <section className="weather_box">
        <WeatherData currentCity={currentCity} message={message} setMessage={setMessage} />
      </section>
      <section className="chart_box">
         <p>Its place for chart</p>
      </section>
    </div>
  )
}

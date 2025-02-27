import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import { cityArr } from "./weather_data.js";
import { useState } from "react";

function App() {
  const [currentCity, setSelectedCity] = useState(cityArr[0]);
  const [message, setMessage] = useState('Loading weather data...git.');
  return (
    <div>
      <Header />
      <div className="main-container">
        <SideBar currentCity={currentCity} setSelectedCity={setSelectedCity} />
        <WeatherContainer currentCity={currentCity} message={message} setMessage={setMessage} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

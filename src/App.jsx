import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import { useState } from "react";
import { InpSeLProvider } from "./context/InputSelectContext.jsx";

function App() {
  const [message, setMessage] = useState('Loading weather data...');
  return (
    <InpSeLProvider>
    <div>
      <Header />
      <div className="main-container">
        <SideBar/>
        <WeatherContainer message={message} setMessage={setMessage} />
      </div>
      <Footer />
    </div>
    </InpSeLProvider>
  );
}

export default App;

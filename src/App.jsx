import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import ButtonPanel from "./components/ButtonPanel.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { useState } from "react";
import { InpSeLProvider } from "./context/InputSelectContext.jsx";


function App() {
  const [message, setMessage] = useState('Loading weather data...');
  const [value, setValue] = useState('Today');
  const [changedInterval, setchangedInterval] = useState(false);
  const [open, setOpen] = useState(false);
  
  function handleOnClick(e) {
    const newValue = e.target.value; 
    setValue(newValue);
    setchangedInterval(!changedInterval);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <InpSeLProvider>
      <Header />
      <Modal open={open} setOpen={setOpen}/>
      <ButtonPanel value={value} onClick={handleOnClick} openModal={openModal}/>
      <div className="main-container">
        <SideBar changedInterval={changedInterval}/>
        <WeatherContainer message={message} setMessage={setMessage} value={value}/>
      </div>
      <Footer />
    </InpSeLProvider>
  );
}

export default App;

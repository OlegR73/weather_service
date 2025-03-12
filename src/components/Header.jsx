import { useState } from "react";
import logo from "/logo_weather.svg";
import  Button  from './Button/Button.jsx'




export default function Header({ value, onClick } ) {
  const [dateNow, setDateNow] = useState(new Date());
  setInterval(() => setDateNow(new Date()),1000);



  return (
    <header>
      <img src={logo} alt="" />
      <h1>Weather Service</h1>
      <Button children={'Today'} onClick={onClick} value={'Today'} />
      <Button children={'Tomorrow'} onClick={onClick} value={'Tomorrow'} />
      <span>Time: {dateNow.toLocaleTimeString()}</span>
    </header>
  );
}

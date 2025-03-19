import { useEffect, useState } from "react";
import logo from "/logo_weather.svg";
import  Button  from './Button/Button.jsx'




export default function Header({ value, onClick } ) {
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateNow(new Date()),1000);

    return () => {clearInterval(interval)}
  }, [])
  



  return (
    <header>
      <img src={logo} alt="" />
      <h1>Weather Service</h1>
      <span>Time: {dateNow.toLocaleTimeString()}</span>
    </header>
  );
}

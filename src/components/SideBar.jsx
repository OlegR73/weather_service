import SelectCity from "./Select/SelectCity.jsx";
import InputCity from "./Input/InputCity.jsx";
import { InputSelectContext } from "../context/InputSelectContext.jsx";
import { useContext, useState } from "react";

export default function SideBar({changedInterval}) {
  const { setSelectedCity } = useContext(InputSelectContext);
  const [changed, setChanged] = useState(false);
  
  function handleInput(e) {
    setSelectedCity(e.target.value);
    setChanged(!changed);
  }

  return (
    <section className="sidebar">
      <SelectCity onChange={handleInput} changed={changed} />
      <InputCity onChange={handleInput} changed={changed} changedInterval={changedInterval} />
    </section>
  );
}

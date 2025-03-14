import OptionCity from "../OptionCity.jsx";
import { cityArr } from "../../weather_data.js";
import { InputSelectContext } from "../../context/InputSelectContext.jsx";
import { useContext } from "react";

export default function SelectCity() {
  const { setSelectedCity } = useContext(InputSelectContext);

  function handleInput(e) {
    setSelectedCity(e.target.value);
  }

  return (
    <div>
      <label htmlFor="city">My cities</label>
      <select onChange={handleInput} name="city">
        {cityArr.map((city, index) => (
          <OptionCity key={index} city={city} />
        ))}
      </select>
    </div>
  );
}

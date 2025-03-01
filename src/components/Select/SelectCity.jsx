import OptionCity from "../OptionCity.jsx";
import { cityArr } from "../../weather_data.js";



export default function SelectCity(props) {

  return (
    <select onChange={props.onChange}>
      {cityArr.map((city, index) => (
        <OptionCity key={index} city={city} />
      ))}
    </select>
  );
}

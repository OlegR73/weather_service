import { createContext, useState } from "react";
import { cityArr } from "../weather_data.js";

export const InputSelectContext = createContext();

export const InpSeLProvider = ({ children }) => {
  const [currentCity, setSelectedCity] = useState(cityArr[0]);

  return (
    <InputSelectContext.Provider value={{ currentCity, setSelectedCity }}>
      {children}
    </InputSelectContext.Provider>
  );
};

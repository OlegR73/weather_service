import { useState } from "react";
import SelectCity from "./Select/SelectCity.jsx";
import InputCity from "./InputCity.jsx";

export default function SideBar({ currentCity, setSelectedCity }) {
  return (
    <section className="sidebar">
      <SelectCity />
      <InputCity />
    </section>
  );
}

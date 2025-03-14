import { useContext } from "react";
import { InputSelectContext } from '../context/InputSelectContext.jsx';

export default function InputCity() {
    const { setSelectedCity } = useContext(InputSelectContext);


    function handleClick(e) {
        e.preventDefault();
        setSelectedCity(e.target[0].value);
    }

    return(
        <form action="" onSubmit={handleClick}>
            <label htmlFor="city">Enter city</label>
            <input type="text" name="city" required />
            <input className="button" type="submit" value="Submit" />
        </form>
        
    )
}
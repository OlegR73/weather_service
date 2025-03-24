import { useContext, useEffect, useRef, useState } from "react";
import { InputSelectContext } from '../../context/InputSelectContext.jsx';

export default function InputCity({changed, changedInterval}) {
    const { setSelectedCity } = useContext(InputSelectContext);
    const inputRef = useRef(null);
    const submitRef = useRef(null);

    
    function handleClick(e) {
        e.preventDefault();
        setSelectedCity(e.target[0].value);
        inputRef.current.value = "";
        inputRef.current.focus();
    }

    function handleChange(e) {
        e.preventDefault();  
        if (!/^[a-zA-Zа-яА-Я\s]*$/.test(e.target.value) || e.target.value === "") {
            submitRef.current.disabled = true;
            submitRef.current.className = "disabled";
        }else{
            submitRef.current.disabled = false;
            submitRef.current.className = "button";
        }
       
    }

    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
            submitRef.current.disabled = true;
            submitRef.current.className = "disabled";
        }
    }, [setSelectedCity, changed, changedInterval]);



    return(
        <form action="" onSubmit={handleClick}>
            <label htmlFor="city">Enter city:</label>
            <input ref={inputRef} type="text" id="city" onChange={handleChange} required />
            <input ref={submitRef}className="button" type="submit" value="Submit" disabled={true} />
        </form>  
    )
}
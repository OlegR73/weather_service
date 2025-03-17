import { useContext, useEffect, useRef } from "react";
import { InputSelectContext } from '../context/InputSelectContext.jsx';
// import ButtonPanel from './ButtonPanel.jsx';

export default function InputCity({changed, changedInterval}) {
    const { setSelectedCity } = useContext(InputSelectContext);
    const inputRef = useRef(null);
    {console.log(changed)}

    function handleClick(e) {
        e.preventDefault();
        setSelectedCity(e.target[0].value);
    }

    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }, [setSelectedCity, changed, changedInterval]);



    return(
        <form action="" onSubmit={handleClick}>
            <label htmlFor="city">Enter city:</label>
            <input ref={inputRef} type="text" id="city" required />
            <input className="button" type="submit" value="Submit" disabled={false} />
            {/* <Button>Submit</Button> */}
        </form>
        
    )
}
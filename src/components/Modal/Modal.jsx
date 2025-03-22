import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import askQuestion from "../../api/openAiRequest.js";
import "./Modal.css";

export default function Modal({ isModalOpen, setIsModalOpen }) {
const dialog = useRef();
const input = useRef();
const submit = useRef();
const[value, setValue] = useState(null);
const [answer, setAnswer] = useState("");

useEffect(() => {
    if (isModalOpen) {
       dialog.current.showModal(); 
    }else{
        dialog.current.close(); 
    }
}, [isModalOpen]);

function submitHandle(e) {
    e.preventDefault();
    setValue(input.current.value);
    input.current.value = "";
    input.current.focus();
}

useEffect(() => {
    if (!value) return;
    askQuestion(value)
      .then((res) => setAnswer(res))
      .catch((err) => {
        console.error(err);
        setAnswer("Request error");
      });
  }, [value]);


  return createPortal(
    <dialog ref={dialog} >
      <p className="closeModal" onClick={() => { setIsModalOpen(false)}}>X</p>

      <div className="chat-response">
        <h3>{value && value.trim() !== "" ? value : "Here will be the answer..."}</h3>
        <div id="botResponse"> {answer} </div>
      </div>

      <form action="" onSubmit={submitHandle} >
        <label htmlFor="city">Enter question:</label>
        <input ref={input} type="text" id="city" required />
        <input ref={submit} className="modalButton" type="submit" value="Submit" disabled={false} />
      </form>
    </dialog>, 
    document.getElementById('modal')
  );
}

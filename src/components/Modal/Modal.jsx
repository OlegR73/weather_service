import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import askQuestion from "../../api/openAiRequest.js";
import "./Modal.css";

export default function Modal({ isModalOpen, setIsModalOpen }) {
const dialog = useRef();
const input = useRef();
const submit = useRef();
let city = "Praha";

const [answer, setAnswer] = useState([]);

useEffect(() => {
    if (isModalOpen) {
       dialog.current.showModal(); 
    }else{
        dialog.current.close(); 
    }
}, [isModalOpen]);

async function submitHandle(e) {
    e.preventDefault();
    const question = input.current.value.trim();
    if (!question) return;


    input.current.value = "";
    input.current.focus();
    
    try {
        const res = await askQuestion(question);
        setAnswer(res);
      } catch (err) {
        console.error(err);
        setAnswer([{ role: "system", content: "Request error" }]);
      }
   
}


  return createPortal(
    <dialog ref={dialog} >
      <p className="closeModal" onClick={() => { setIsModalOpen(false)}}>X</p>

      <form action="" onSubmit={submitHandle} >
        <label htmlFor="city">Enter question:</label>
        <input ref={input} type="text" id="city" value={`Weather in ${city}`} required />
        <input ref={submit} className="modalButton" type="submit" value="Submit" disabled={false} />
      </form>

      {answer.map((msg, index) => (
         <div id="botResponse" key={index}> {msg.content} </div>
      ))}

    {/* 
      <div className="chat_response">
        <div id="question">{value && value.trim() !== "" ? value : ""}</div>
        <div id="botResponse"> {answer} </div>
      </div> 
    */}

    </dialog>, 
    document.getElementById('modal')
  );
}

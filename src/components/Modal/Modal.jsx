import { useRef, useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import askQuestion from "../../api/openAiRequest.js";
import { InputSelectContext } from "../../context/InputSelectContext.jsx";
import "./Modal.css";


export default function Modal({ isModalOpen, setIsModalOpen }) {
  const dialog = useRef();
  const input = useRef();
  const submit = useRef();
  const [answer, setAnswer] = useState([]);
  const { currentCity } = useContext(InputSelectContext);
  let city = currentCity;
  const color = "red";


  useEffect(() => {
    if (isModalOpen) {
      dialog.current.showModal();
      input.current.value = `Weather in ${city}`;
    } else {
      dialog.current.close();
    }
  }, [isModalOpen]);

  async function submitHandle(e) {
    e.preventDefault();
    const question = input.current.value.trim();
    if (!question) return;

    input.current.value = "";
    input.current.focus();
    submit.current.value = "Waiting an answer...";
    submit.current.className = "modalButton loading";

    try {
      const res = await askQuestion(question);
      setAnswer(res);
      submit.current.className = "modalButton";
    } catch (err) {
      console.error(err);
      setAnswer([{ role: "system", content: "Request error" }]);
    }
  }

  return createPortal(
    <dialog ref={dialog}>
      <p className="closeModal" onClick={() => {setIsModalOpen(false);}}>X</p>
      <form action="" onSubmit={submitHandle}>
        <label htmlFor="city">Enter question:</label>
        <input ref={input} type="text" id="city" required />
        <input ref={submit} className="modalButton" type="submit" value="Submit" disabled={false}/>
      </form>
      <div className="chat">
        {answer.slice().reverse().filter(msg => msg.role !== "system").map((msg, index) => (
          msg.role === "user" ? <strong key={index} id="question">{msg.content}</strong> : <div  key={index} id="answer" style={isError ? color : null }>{" "}{msg.content}{" "}</div>
        ))}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

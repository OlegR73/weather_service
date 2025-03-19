import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export default function Modal({ isModalOpen, setIsModalOpen }) {
const dialog = useRef();

useEffect(() => {
    if (isModalOpen) {
       dialog.current.showModal(); 
    }else{
        dialog.current.close(); 
    }
}, [isModalOpen]);

  return createPortal(
    <dialog ref={dialog} >
      <p className="closeModal" onClick={() => { setIsModalOpen(false)}}>X</p>

      <div className="chat-response">
        <h3>It's place for Open AI weather assistant. Doesn't work yet.</h3>
        <p id="botResponse">Here will be the answer...</p>
      </div>

      <form action="">
        <label htmlFor="city">Enter question:</label>
        <input type="text" id="city" required />
        <input className="modalButton" type="submit" value="Submit" disabled={false} />
      </form>
    </dialog>, 
    document.getElementById('modal')
  );
}

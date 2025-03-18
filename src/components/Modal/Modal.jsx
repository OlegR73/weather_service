import "./Modal.css";

export default function Modal({ open, setOpen }) {
  return (
    <dialog open={open} >
      <p className="closeModal" onClick={() => { setOpen(false)}}>X</p>

      <div className="chat-response">
        <h3>It's place for Open AI weather assistant. Doesn't work yet.</h3>
        <p id="botResponse">Here will be the answer...</p>
      </div>

      <form action="">
        <label htmlFor="city">Enter question:</label>
        <input type="text" id="city" required />
        <input className="button" type="submit" value="Submit" disabled={false} />
      </form>
    </dialog>
  );
}

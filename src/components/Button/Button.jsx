import './Button.css'
export default function Button({ children, onClick, value, isActive}) {
    return <button className={`button ${isActive ? 'active' : ''}`}  onClick={onClick} value={value} >{ children }</button>
}
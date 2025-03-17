import './Button.css'

export default function Button({ children, onClick, value}) {
    return <button className='button'  onClick={onClick} value={value} >{ children }</button>
}
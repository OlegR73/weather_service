import  Button  from './Button/Button.jsx';

export default function ButtonPanel({ children, onClick, value }) {
    return (
     <div className='buttonPanelBox'>
        <Button children={'Today'} onClick={onClick} value={'Today'} />
        <Button children={'Tomorrow'} onClick={onClick} value={'Tomorrow'} />
        <Button children={'ThreeDays'} onClick={onClick} value={'ThreeDays'} />
     </div>   
   
    )    
}
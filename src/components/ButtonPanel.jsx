import  Button  from './Button/Button.jsx';

export default function ButtonPanel({ onClick }) {
    return (
     <div className='buttonPanelBox'>
        <Button children={'Today'} onClick={onClick} value={'Today'} />
        <Button children={'Tomorrow'} onClick={onClick} value={'Tomorrow'} />
        <Button children={'Three Days'} onClick={onClick} value={'Three Days'} />
        <Button children={'Seven days'} onClick={onClick} value={'Seven Days'} />
     </div>   
   
    )    
}
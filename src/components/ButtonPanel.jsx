import  Button  from './Button/Button.jsx';

export default function ButtonPanel({ onClick, openModal, activeButton }) {
    console.log('Active Button:', activeButton);
    return (
     <div className='buttonPanelBox'>
        <Button children={'AI assistant'} onClick={openModal} value={''} />
        <Button children={'Today'} onClick={onClick} value={'Today'} isActive={activeButton === 'Today'} />
        <Button children={'Tomorrow'} onClick={onClick} value={'Tomorrow'} isActive={activeButton === 'Tomorrow'} />
        <Button children={'Three Days'} onClick={onClick} value={'Three Days'} isActive={activeButton === 'Three Days'} />
        <Button children={'Seven days'} onClick={onClick} value={'Seven Days'} isActive={activeButton === 'Seven Days'} />
     </div>   
   
    )    
}
export default function InputCity(props) {
    return(
        <form action="" onSubmit={props.onSubmit}>
            <input type="text" required />
            <input className="button" type="submit" value="Submit" />
        </form>
        
    )
}
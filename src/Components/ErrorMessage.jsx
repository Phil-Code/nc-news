export default function ErrorMessage({setErr}){

    return (
        <div className="error-container">
            <p>Sorry, it looks like voting is not working right now, please try again later</p> 
            <button onClick={()=>setErr({})}>dismiss</button>
        </div>
    )       
}
import { useEffect, useState } from "react"
import { handleLikes } from "../utils"
import ErrorMessage from "./ErrorMessage"

export default function Voting({id, votes, patchingTo}){
    const [err, setErr] = useState({})

    const [localLikes, setLocalLikes] = useState(0)

    useEffect(()=>{
        if (err.code === "ERR_BAD_REQUEST"){
            setLocalLikes(0)
        }
    }, [err])

    if (err.code){
        return <ErrorMessage setErr={setErr}/>
    }
    
    return (
        
        <div className="vote-button-container">
            <button className="button vote-button" disabled={localLikes < 0} onClick={()=>handleLikes(id, 'minus', setLocalLikes, patchingTo, setErr)}>don't like</button>
            <p className="vote-display">{localLikes + votes}</p>
            <button className="button vote-button" disabled={localLikes > 0} onClick={()=>handleLikes(id, 'plus', setLocalLikes, patchingTo, setErr)}>like</button>
         </div>
        
    )
}
import { useState } from "react"
import { handleLikes } from "../utils"

export default function Voting({id, votes, patchingTo}){

    const [localLikes, setLocalLikes] = useState(0)

    return (
        <div className="vote-button-container">
            <button className="button vote-button" disabled={localLikes < 0} onClick={()=>handleLikes(id, 'minus', setLocalLikes, patchingTo)}>don't like</button>
            <p className="vote-display">{localLikes + votes}</p>
            <button className="button vote-button" disabled={localLikes > 0} onClick={()=>handleLikes(id, 'plus', setLocalLikes, patchingTo)}>like</button>
        </div>
    )
}
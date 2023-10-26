import { useState } from "react"
import { deleteComment } from "../utils"

export default function DeleteComment({comment_id, setCommentCount, setDeletingErr}){
    const [awaitingResponse, setAwaitingResponse] = useState(false)

    function handleDelete(){
        setDeletingErr(null)
        setAwaitingResponse(true)
        deleteComment(comment_id)
        .then(()=>{
            setCommentCount((current)=>{
                return current - 1
            })
            setAwaitingResponse(false)
        })
        .catch(()=>{
            setDeletingErr(comment_id)
            setAwaitingResponse(false)
        })
    }

    return (
        <div>
            <button disabled={awaitingResponse} onClick={handleDelete}>delete comment</button>
        </div>
    )
}
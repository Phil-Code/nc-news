import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoginBar from "./LoginBar";
import { LoginContext } from "./Contexts/LoginContext";
import { postComment } from "../utils";

export default function PostComment({setIsPosting, setComments, setPostingErr, setCommentCount }){

    const {article_id} = useParams()
    const [body, setBody] = useState('')
    const [isValidComment, setIsValidComment] = useState(false)
    const {login, setLogin} = useContext(LoginContext)

    function handleSubmit(e){
        e.preventDefault()
        setPostingErr(false)
        if (isValidComment){
            setComments((current)=>{
                return [{"author": login, "body": body, "votes": 0, newPost: true}, ...current]
            })
            setBody('')
            setIsPosting(false)
            postComment(article_id, {"username": login, "body": body})
            .then(()=>{
                setCommentCount((current)=>{
                    return current + 1
                })
            })
            .catch(()=>{
                setIsPosting(true)
                setPostingErr(true)
                setComments((current)=>{
                    const updated = current.filter((comment)=>{
                        return !comment.newPost
                    })
                    return [...updated]
                })
            })        
        }
    }

    function handleBodyChange(e){
        setBody(e.target.value)
        if (e.target.value.split(' ').length >= 5){
            setIsValidComment(true)
        } else (setIsValidComment(false))
    }

    if (login === 'Guest'){
        return  <div>
            <p>you must be logged in to add a comment</p>
            <LoginBar/>
        </div>
       
}
    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="comment-input">
            <label htmlFor="body">Your comment: </label>
            <input id='body' value={body} onChange={handleBodyChange} type="text" />
            </div>
            <div className="comment-feedback">
                {isValidComment ? '' : <p>please write a longer comment</p>}
            </div>
            <div className="button-container">
              <button type='submit' className="button submit-button">post comment</button>
              <button className="button cancel-submit" onClick={()=>setIsPosting(false)}>Cancel</button>
            </div>
        </form>
    )
}
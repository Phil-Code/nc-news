import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers, postComment } from "../utils";

export default function PostComment({setIsPosting, setComments, setPostingErr }){

    const {article_id} = useParams()
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [isValidName, setIsValidName] = useState(false)
    const [isValidComment, setIsValidComment] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
        .then((result)=>{
            const usernames = [];
            result.forEach((user)=>{
                usernames.push(user.username)
            })
            setUsers(usernames)
        })
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        setPostingErr(false)
        if (isValidName && isValidComment){
            setComments((current)=>{
                return [{"author": name, "body": body, "votes": 0, newComment: true}, ...current]
            })
            setName('')
            setBody('')
            setIsPosting(false)
            postComment(article_id, {"username": name, "body": body})
            .catch(()=>{
                setIsPosting(true)
                setPostingErr(true)
            })        
        }
    }
    function handleNameChange(e){
        setName(e.target.value)
        if (users.includes(e.target.value)){
            setIsValidName(true)
        } else setIsValidName(false)
    }

    function handleBodyChange(e){
        setBody(e.target.value)
        if (e.target.value.split(' ').length >= 5){
            setIsValidComment(true)
        } else (setIsValidComment(false))
    }
    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="name-input">
            <label htmlFor="name">Your name: </label>
            <input id='name' value={name} onChange={handleNameChange} type="text" />
            </div>
            <div className="name-feedback">
                {isValidName ? '' : <p>please enter a valid username (try grumpy19)</p>}
            </div>
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
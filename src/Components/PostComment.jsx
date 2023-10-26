import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers, postComment } from "../utils";
import LoginBar from "./LoginBar";
import { LoginContext } from "./Contexts/LoginContext";

export default function PostComment({setIsPosting, setComments, setPostingErr, setCommentCount }){

    const {article_id} = useParams()
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [isValidName, setIsValidName] = useState(false)
    const [isValidComment, setIsValidComment] = useState(false)
    const [users, setUsers] = useState([])
    const {login, setLogin} = useContext(LoginContext)

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
                return [{"author": name, "body": body, "votes": 0, newPost: true}, ...current]
            })
            setName('')
            setBody('')
            setIsPosting(false)
            postComment(article_id, {"username": name, "body": body})
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

    if (login === 'Guest'){
        return  <div>
            <p>you must be logged in to add a comment</p>
            <LoginBar/>
        </div>
       
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
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleComments } from "../utils";
import Voting from "./Voting";
import PostComment from "./PostComment";
import { LoginContext } from "./Contexts/LoginContext"
import DeleteComment from "./DeleteComment";

export default function ArticleComments(){

    const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false)
    const [postingErr, setPostingErr] = useState(false)
    const [deletingErr, setDeletingErr] = useState(false)
    const {login, setLogin} = useContext(LoginContext)
    const [commentCount, setCommentCount] = useState(0)

    useEffect(()=>{
        fetchArticleComments(article_id)
        .then((result)=>{
            setComments(result)
            setIsLoading(false)
            setCommentCount(result.length)
        })
    }, [article_id, commentCount])

    if (isLoading)return <p>loading...</p>

    if (!comments.length)return <p>nobody has left a comment yet</p>
 
    return (
        <div className="comments-list">
            {isPosting? <PostComment setCommentCount={setCommentCount} setPostingErr={setPostingErr} setComments={setComments} setIsPosting={setIsPosting}/> : <><button onClick={()=>setIsPosting(true)}>add a comment</button> </>}
            <h4>Comments</h4>
            {postingErr? <p style={{backgroundColor: 'pink'}}>sorry, it looks as though we can't add your comment right now, please try again later</p> : ''}
            {comments.map(({author, votes, body, comment_id})=>{
                    return <div key={body + comment_id} className="comment-card">
                    <p>{body}</p>
                    <p>Do you like this comment by <strong>{author}</strong>?</p>
                    <Voting  id={comment_id} votes={votes} patchingTo={'comments'}/>
                    {login === author? <DeleteComment setDeletingErr={setDeletingErr} setCommentCount={setCommentCount} comment_id={comment_id}/> : <></>}
                    {deletingErr === comment_id ? <p style={{backgroundColor: 'pink'}}>sorry, it looks as though we can't delete your comment right now, please try again later</p> : ''}
                </div>
                }   
            )}
        </div>
    )
}
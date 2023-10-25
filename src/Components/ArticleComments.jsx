import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleComments } from "../utils";
import Voting from "./Voting";
import PostComment from "./PostComment";

export default function ArticleComments(){

    const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false)
    const [postingErr, setPostingErr] = useState(false)

    useEffect(()=>{
        fetchArticleComments(article_id)
        .then((result)=>{
            setComments(result)
            setIsLoading(false)
        })
    }, [article_id])

    if (isLoading)return <p>loading...</p>

    if (!comments.length)return <p>nobody has left a comment yet</p>
    let border = "2px solid green"
    if (postingErr){
        border = "2px solid red"
    }

    return (
        <div className="comments-list">
            {isPosting? <PostComment setPostingErr={setPostingErr} setComments={setComments} setIsPosting={setIsPosting}/> : <><button onClick={()=>setIsPosting(true)}>add a comment</button> </>}
            <h4>Comments</h4>
            {comments.map(({author, votes, body, comment_id, newComment})=>{

                if (newComment){
                    return <div style={{"border": border}} key={body + comment_id} className="comment-card">
                        <p>{body}</p>
                        <p>-- {postingErr ? "Sorry, we can't post your comment at this time, please try later" : 'You cannot vote on your own comment!'} --</p>
                    </div>
                } else {
                    return <div key={body + comment_id} className="comment-card">
                    <p>{body}</p>
                    <p>Do you like this comment by <strong>{author}</strong>?</p>
                    <Voting  id={comment_id} votes={votes} patchingTo={'comments'}/>
                </div>
                }
               
            })}
        </div>
    )
}
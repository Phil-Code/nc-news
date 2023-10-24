import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleComments, fetchSingleArticle, handleLikes } from "../utils";
import Voting from "./Voting";

export default function ArticleComments(){

    const {article_id} = useParams()
    const [articleTitle, setArticleTitle] = useState('')
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetchArticleComments(article_id)
        .then((result)=>{
            setComments(result)
            setIsLoading(false)
        })
        .then(()=>{
            fetchSingleArticle(article_id)
            .then((result)=>{
                setArticleTitle(result.title)
            })
        })
    }, [article_id])

    if (isLoading)return <p>loading...</p>

    return (
        <div>
            <h2>{articleTitle}</h2>
            <h3>Here's what people have been saying:</h3>
            {comments.map(({author, votes, body, comment_id})=>{
                return <div key={body}>
                        <p>{body}</p>
                        <p>comment by {author}</p>
                        <Voting  id={comment_id} votes={votes} patchingTo={'comments'}/>
                    </div>
            })}
        </div>
    )
}
import { useParams } from 'react-router-dom';
import { fetchSingleArticle, handleLikes } from '../utils';
import { useEffect, useState } from 'react';

export default function SingleArticle(){
   const [isLoading, setIsLoading] = useState(true) 
   const {article_id} = useParams() 
   const [article, setArticle] = useState({})
   const [likes, setLikes] = useState(0)

   const {title, author, article_img_url, body, votes, comment_count} = article
   
   useEffect(()=>{
    fetchSingleArticle(article_id)
    .then((result)=>{
        setArticle(result)
        setIsLoading(false)
    })
   }, [article_id])

   if (isLoading)return <p>loading...</p>

   return (
    <div>
        <h2>{title}</h2>
        <p>by {author}</p>
        <p>{body}</p>
        <img src={article_img_url}/>
        <p>see what people are saying about this article ({comment_count} comments)</p>
        <button disabled={likes < 0} onClick={()=>handleLikes(article_id, 'minus', setLikes)}>don't like</button>
        <p>{likes + votes}</p>
        <button disabled={likes > 0} onClick={()=>handleLikes(article_id, 'plus', setLikes)}>like</button>
    </div>
   )
}
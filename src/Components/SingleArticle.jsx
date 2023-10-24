import { useParams, Link } from 'react-router-dom';
import { fetchSingleArticle } from '../utils';
import { useEffect, useState } from 'react';
import Voting from './Voting';

export default function SingleArticle(){
   const [isLoading, setIsLoading] = useState(true) 
   const {article_id} = useParams() 
   const [article, setArticle] = useState({})

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
        <Link to={`/articles/${article_id}/comments`}>
            <p>see what people are saying about this article ({comment_count} comments)</p>
            </Link>
        <Voting id={article_id} votes={votes} patchingTo={'articles'}/>
    </div>
   )
}
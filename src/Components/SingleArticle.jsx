import { useParams } from 'react-router-dom';
import { fetchSingleArticle } from '../utils';
import { useEffect, useState } from 'react';
import Voting from './Voting';
import ArticleComments from './ArticleComments';


export default function SingleArticle(){
   const [isLoading, setIsLoading] = useState(true) 
   const {article_id} = useParams() 
   const [article, setArticle] = useState({})
   
   

   const {title, author, article_img_url, body, votes} = article
   
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
        <h3>Do you like this article?</h3>
        <Voting id={article_id} votes={votes} patchingTo={'articles'}/>
        <ArticleComments />
    </div>
   )
}
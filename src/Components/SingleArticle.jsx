import { useParams, Link } from 'react-router-dom';
import { fetchSingleArticle } from '../utils';
import { useEffect, useState } from 'react';
import Voting from './Voting';
import ArticleComments from './ArticleComments';
import PostComment from './PostComment';

export default function SingleArticle(){
   const [isLoading, setIsLoading] = useState(true) 
   const {article_id} = useParams() 
   const [article, setArticle] = useState({})
   const [isPosting, setIsPosting] = useState(false)

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
        <h3>Do you like this article?</h3>
        <Voting id={article_id} votes={votes} patchingTo={'articles'}/>
        {/* <Link to={`/${article_id}/leave-a-comment`}><h3>Add a comment?</h3></Link> */}
        
        {isPosting? <PostComment setIsPosting={setIsPosting}/> : <><button onClick={()=>setIsPosting(true)}>add a comment</button> <ArticleComments /></>}
        
    </div>
   )
}
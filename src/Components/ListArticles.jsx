
import { Link, useSearchParams } from "react-router-dom"
import SortBar from "./SortBar"
import TopicButton from './TopicButton'

export default function ListArticles({articles}){

    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || 1
    const newParams = new URLSearchParams(searchParams);

    function handlePrevNext(button){
        if (button === 'prev'){
            if (page > 1){
                newParams.set('page', +page - 1);
            }
        } else if (button === 'next') {
            newParams.set('page', +page + 1)
        }
        setSearchParams(newParams);
    }

    return (
        <div>
            <SortBar/>
            <div className="articles-container">
            {articles.map(({title, author, topic, article_id, comment_count, votes, article_img_url})=>{
              return <div key={title + author} className="article-card">
                        <Link to={`/articles/${article_id}`}><img className='article-img' src={article_img_url}/></Link>
                        <p className="article-topic"><TopicButton topic={topic}>{topic}</TopicButton></p>
                        <div className="article-card-content">
                        <Link className="article-title" to={`/articles/${article_id}`}>{title}</Link>
                        <p className="vote-comment">{votes} votes and {comment_count} comments</p>
                        </div>
                    </div>
            })}
            </div>
            <button className='button nav-button' onClick={()=>handlePrevNext('prev')} disabled={page <= 1}>prev</button>
            <button className='button nav-button'  onClick={()=>handlePrevNext('next')} disabled={page >= articles[0].total_count / 5}>next</button>
        </div>
    )
}

import { Link, useSearchParams } from "react-router-dom"
import { getTopicColours } from "../utils"
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
            {articles.map(({title, author, topic, article_id, comment_count, votes})=>{
              return <div key={title + author} className="article-card">
                        <Link to={`/articles/${article_id}`}><h3>{title} -- by {author}</h3></Link>
                        <p><TopicButton topic={topic}>{topic}</TopicButton>{votes} votes and {comment_count} comments</p>
                    </div>
            })}
            <button className='button nav-button' onClick={()=>handlePrevNext('prev')} disabled={page <= 1}>prev</button>
            <button className='button nav-button'  onClick={()=>handlePrevNext('next')} disabled={page >= articles[0].total_count / 5}>next</button>
        </div>
    )
}

import { Link } from "react-router-dom"
import { handlePrevNext } from "../utils"

export default function ListArticles({articles, page, setPage}){

    return (
        <div>
            {articles.map(({title, author, topic, article_id})=>{
              return <div key={title + author}>
                        <Link to={`/articles/${article_id}`}><h3>{title} -- by {author}</h3></Link>
                        <p>{topic}</p>
                    </div>
            })}
            <button className='button nav-button' onClick={()=>handlePrevNext('prev', setPage)} disabled={page <= 1}>prev</button>
            <button className='button nav-button'  onClick={()=>handlePrevNext('next', setPage)} disabled={page >= articles[0].total_count / 5}>next</button>
        </div>
    )
}
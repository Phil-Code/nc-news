import { handlePrevNext } from "../utils"

export default function ListArticles({articles, page, setPage}){

    return (
        <div>
            {articles.map(({title, author, topic})=>{
              return <div key={title + author}>
                        <h3>{title} -- by {author}</h3>
                        <p>{topic}</p>
                    </div>
            })}
            <button onClick={()=>handlePrevNext('prev', setPage)} disabled={page <= 1} className="prev-articles">prev</button>
            <button onClick={()=>handlePrevNext('next', setPage)} disabled={page >= articles[0].total_count / 5} className="next-articles">next</button>
        </div>
    )
}
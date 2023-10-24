import { useEffect, useState } from "react"
import { fetchArticles } from "../utils"
import TopicLinks from "./TopicLinks"
import ListArticles from "./ListArticles"

export default function Home(){

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [topic, setTopic] = useState('all')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetchArticles(page, 5, topic)
        .then((result)=>{
            setArticles(result);
            setIsLoading(false);
            
        })
    }, [page, topic])

    if (isLoading)return <p>loading...</p>

    return (
        <div>
            <ListArticles articles={articles} page={page} setPage={setPage}/>
        </div>
    )
}
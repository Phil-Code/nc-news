import { useEffect, useState } from "react"
import { fetchArticles } from "../utils"
import ListArticles from "./ListArticles"
import { useParams } from "react-router-dom"

export default function TopicArticles(){

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const {topic} = useParams()

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
            <h2>{topic}</h2>
            <ListArticles articles={articles} page={page} setPage={setPage}/>
        </div>
    )
}
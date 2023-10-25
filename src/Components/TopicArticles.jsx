import { useEffect, useState } from "react"
import { fetchArticles } from "../utils"
import ListArticles from "./ListArticles"
import { useParams } from "react-router-dom"

export default function TopicArticles(){

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const {topic} = useParams()
    const [order, setOrder] = useState('desc')

    useEffect(()=>{
        fetchArticles(page, 5, topic, order)
        .then((result)=>{
            setArticles(result);
            setIsLoading(false);
            
        })
    }, [page, topic, order])

    if (isLoading)return <p>loading...</p>

    return (
        <div>
            <ListArticles order={order} setOrder={setOrder} articles={articles} page={page} setPage={setPage}/>
        </div>
    )
}
import { useEffect, useState } from "react"
import { fetchArticles } from "../utils"
import ListArticles from "./ListArticles"
import { useSearchParams } from 'react-router-dom';

export default function Home(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [topic, setTopic] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [order, setOrder] = useState('desc')
    const [sortBy, setSortBy] = useState('created_at')

    useEffect(()=>{
        fetchArticles(page, 5, topic, order, sortBy)
        .then((result)=>{
            setArticles(result);
            setIsLoading(false);
            
        })
    }, [page, topic, order, sortBy, searchParams])

    if (isLoading)return <p>loading...</p>
    console.log(page)
    return (
        <div>
            <ListArticles setSortBy={setSortBy} order={order} setOrder={setOrder} articles={articles} page={page} setPage={setPage}/>
        </div>
    )
}
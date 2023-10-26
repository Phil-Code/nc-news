import { useEffect, useState } from "react"
import { fetchArticles } from "../utils"
import ListArticles from "./ListArticles"
import { useSearchParams } from 'react-router-dom';
import TopicLinks from './TopicLinks'
import ErrorPage from "./ErrorPage";

export default function Home(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isErr, setIsErr] = useState(false)

    const sortBy = searchParams.get('sort_by')
    const page = searchParams.get('page')
    const order = searchParams.get('order')
    const topic = searchParams.get('topic')

    useEffect(()=>{
        if (!page){
            const newParams = new URLSearchParams(searchParams)
            newParams.set('page', 1)
            newParams.set('sort_by', 'created_at')
            newParams.set('order', 'desc')
            setSearchParams(newParams)
        }
        fetchArticles(page, 5, topic, order, sortBy)
        .then((result)=>{
            setArticles(result);
            setIsLoading(false);
            setIsErr(false)
        })
        .catch((err)=>{
            setIsErr(true)
            setIsLoading(false)
        })
    }, [page, sortBy, order, topic])



    if (isLoading)return <p>loading...</p>
    if (isErr)return <ErrorPage/>
    return (
        <div>
            <TopicLinks/>
            <ListArticles  articles={articles}/>
        </div>
    )
}
import { useEffect, useState } from "react";
import { fetchTopics, handleTopicClick } from "../utils";

export default function Topics({setTopic, setArticles, setPage}){

    const [topics, setTopics] = useState([])

    useEffect(()=>{
        fetchTopics()
        .then((result)=>{
            setTopics(()=>{
                const topicsArray = ['all'];
                result.forEach((topic)=>{
                    topicsArray.push(topic.slug)
                });
                return topicsArray
            })
        })
    }, [])
   
    return (
        <div>
            {topics.map((topic)=>{
                return <button key={topic} onClick={()=>handleTopicClick(topic, setTopic, setPage)}>{topic}</button>
            })}
        </div>
    )
}
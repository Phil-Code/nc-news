import { useEffect, useState } from "react";
import { fetchTopics, getTopicColours } from "../utils";
import { useSearchParams } from "react-router-dom";

export default function TopicLinks(){

    const [topics, setTopics] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    function handleTopicClick(e){
    const newParams = new URLSearchParams(searchParams)
    newParams.set('topic', e.target.value)
    setSearchParams(newParams)
    }

    useEffect(()=>{
        fetchTopics()
        .then((result)=>{
            setTopics(()=>{
                const topicsArray = [];
                result.forEach((topic)=>{
                    topicsArray.push(topic.slug)
                });
                return topicsArray
            })
        })
    }, [])
   
    return (
        <h2 className="topic-container">
            {topics.map((topic)=>{
                return <button value={topic} style={{"backgroundColor": getTopicColours(topic)}} className="button topic-link" key={topic} onClick={handleTopicClick}>{topic}</button>
            })}
        </h2>
    )
}
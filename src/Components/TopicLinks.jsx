import { useEffect, useState } from "react";
import { fetchTopics } from "../utils";
import TopicButton from './TopicButton'

export default function TopicLinks(){

    const [topics, setTopics] = useState([])
  

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
                return <TopicButton key={topic} topic={topic}/>
            })}
        </h2>
    )
}
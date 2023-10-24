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

    const colours = [ 'white', 'skyblue', 'lightgreen', 'lemonchiffon', 'pink', 'lavender', 'linen', 'peachpuff']
   
    return (
        <div>
            {topics.map((topic)=>{
                return <button className="button topic-button" style={{'backgroundColor': colours.shift()}} key={topic} onClick={()=>handleTopicClick(topic, setTopic, setPage)}>{topic}</button>
            })}
        </div>
    )
}
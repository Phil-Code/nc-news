import { useEffect, useState } from "react";
import { fetchTopics } from "../utils";
import { Link } from "react-router-dom";

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

    const colours = [ 'skyblue', 'lightgreen', 'lemonchiffon', 'pink', 'lavender', 'linen', 'peachpuff']
   
    return (
        <h2 className="topic-container">
            {topics.map((topic)=>{
                return <Link style={{"backgroundColor": colours.shift()}} className="topic-link" key={topic} to={`/topic/${topic}`}>{topic}</Link>
            })}
        </h2>
    )
}
import { useSearchParams } from "react-router-dom";
import { getTopicColours } from "../utils";

export default function TopicButton({topic}){

    const [searchParams, setSearchParams] = useSearchParams()

    function handleTopicClick(e){
    const newParams = new URLSearchParams(searchParams)
    newParams.set('topic', e.target.value)
    newParams.set('page', 1)
    newParams.set('order', 'desc')
    setSearchParams(newParams)
    }

    return (
        <button value={topic} style={{"backgroundColor": getTopicColours(topic)}} className="button topic-link"  onClick={handleTopicClick}>{topic}</button>
    )
}
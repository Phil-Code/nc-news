import axios from "axios";

export function fetchArticles(page=1, limit=5, topic){

    let path = `https://nc-news-qqh3.onrender.com/api/articles?limit=${limit}&&p=${page}`
    if (topic !== 'all'){
        path += `&&topic=${topic}`
    }  
    return axios.get(path)
    .then((result)=>{return result.data.articles})
    .catch(err=>console.log(err))
}

export function handlePrevNext(button, setPage){
    if (button === 'prev'){
        setPage((current)=>{
            if (current > 1){
                return current - 1
            } else return 1;
        })
    } else {
        setPage((current)=>{
            return current + 1
        })
    }
}

export function fetchTopics(){
    return axios.get('https://nc-news-qqh3.onrender.com/api/topics')
    .then((result)=>{return result.data.topics})
    .catch(err=>console.log(err))
}

export function handleTopicClick(topic, setTopic, setPage){
    setTopic(topic);
    setPage(1)
}
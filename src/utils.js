import axios, { Axios } from "axios";

const newsApi = axios.create({
    baseURL: 'https://nc-news-qqh3.onrender.com/api'
  });

export function fetchArticles(page=1, limit=5, topic){

    let path = `/articles?limit=${limit}&&p=${page}`
    if (topic !== 'all'){
        path += `&&topic=${topic}`
    }  
    return newsApi.get(path)
    .then((result)=>{return result.data.articles})
    .catch(err=>console.log(err))
}

export function fetchSingleArticle(article_id){
    return newsApi.get(`/articles/${article_id}`)
    .then((result)=>{
        return result.data.article
    })
    .catch((err)=>console.log(err))
}

export function fetchArticleComments(article_id){
    return newsApi.get(`articles/${article_id}/comments`)
    .then((result)=>{
        return result.data.comments
    })
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
    return newsApi.get('/topics')
    .then((result)=>{return result.data.topics})
    .catch(err=>console.log(err))
}

export function handleTopicClick(topic, setTopic, setPage){
    setTopic(topic);
    setPage(1)
}

export function handleLikes(id, operator, setLikes, patchingTo, setErr){
   
    let path = `/articles/${id}`;
    
    if (patchingTo === 'comments'){
        path = `/comments/${id}`
    }

    if (operator === 'minus'){
        setLikes((current)=>{
            return --current;
        })
    } else (setLikes((current)=>{
        return ++current
    }))
    return newsApi.patch(path, {
            "inc_votes": operator === 'minus' ? -1 : 1
        })
        .catch((err)=>{
            setErr(err)
        })

}
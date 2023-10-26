import axios from "axios";

const newsApi = axios.create({
    baseURL: 'https://nc-news-qqh3.onrender.com/api'
  });

export function fetchArticles(page, limit, topic, order, sortBy){
    const params = {p: page || 1, limit: limit || 5, topic, order: order || 'desc', sort_by: sortBy || 'created_at'}

    return newsApi.get('articles', {params})
    .then((result)=>{return result.data.articles})
}

export function fetchSingleArticle(article_id){
    return newsApi.get(`/articles/${article_id}`)
    .then((result)=>{
        return result.data.article
    })
}

export function fetchArticleComments(article_id){
    return newsApi.get(`articles/${article_id}/comments`)
    .then((result)=>{
        return result.data.comments
    })
}

export function fetchTopics(){
    return newsApi.get('/topics')
    .then((result)=>{return result.data.topics})
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

export function postComment(article_id, comment){
    return newsApi.post(`/articles/${article_id}/comments`, comment)
}

export function fetchUsers(){
    return newsApi.get('/users')
    .then((result)=>{
        return result.data.users
    })
}

export function getTopicColours(topic){
    const colours = {
        coding: 'skyblue',
        football: 'lightgreen', 
        cooking: 'lemonchiffon',
    }
    return colours[topic]
}

export function deleteComment(comment_id){
    return newsApi.delete(`/comments/${comment_id}`)
}
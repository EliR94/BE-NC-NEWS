const db = require("../db/connection.js")
const { fetchTopics } = require("./topics.models.js")

exports.fetchArticles = (topic, sort_by = 'created_at', order = 'DESC') => {
        if(!['author', 'title', 'article_id', 'topic','created_at','votes','article_img_url',"comment_count"].includes(sort_by)){
            return Promise.reject()
        }
        if(!['DESC', 'ASC', 'asc', 'desc'].includes(order)){
            return Promise.reject()
        }
        let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`
        queryValues = []
        if(topic){
            queryStr += ` WHERE articles.topic = $1`
            queryValues.push(topic)
        }
        queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`
        return db
            .query(queryStr, queryValues)
            .then(({rows}) => {
                return rows
            })      
}

exports.fetchArticleById = (article_id) => {
    return db
        .query("SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id", [article_id])
        .then(({rows}) => {
            const article = rows[0];
            if(!article){
                return Promise.reject({
                    status: 404, 
                    msg: `No article found for article_id: ${article_id}`
                })
            }
            return article;
        })
}

exports.updateArticleVotesById = (article_id, inc_votes) => {
    return db
        .query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *", [inc_votes, article_id])
        .then(({rows}) => rows[0])
}
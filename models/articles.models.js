const db = require("../db/connection.js")

exports.fetchArticles = () => {
    return db
        .query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC")
        .then(({rows}) => {
            return rows
        })      
}

exports.fetchArticleById = (article_id) => {
    return db
        .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
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
    .query("SELECT votes FROM articles WHERE article_id = $1", [article_id])
    .then(({rows}) => {
        const oldVotes = rows[0];
        const newVotes = oldVotes.votes + inc_votes;
        return db
            .query("UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *", [newVotes, article_id])
            .then(({rows}) => rows[0])
    })
}
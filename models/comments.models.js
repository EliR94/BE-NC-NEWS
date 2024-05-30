const db = require("../db/connection.js")

exports.fetchCommentsByArticleId = (article_id) => {
    return db
        .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC", [article_id])
        .then(({rows}) => {
            return rows
        })
}

exports.insertCommentByArticleId = (article_id, newComment) => {
    const { username, body } = newComment;
    return db
        .query("INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;", [username, body, article_id])
        .then(({rows}) => {
            return rows[0]
        })
}

exports.fetchCommentByCommentId = (comment_id) => {
    return db
    .query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
    .then(({rows}) => {
        const comment = rows[0];
        if(!rows.length){
            return Promise.reject({
                status: 404,
                msg: `No comment found for comment id: ${comment_id}`
            })
        }
        return comment;
    })
}

exports.removeCommentById = (comment_id) => {
    return db
    .query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
}
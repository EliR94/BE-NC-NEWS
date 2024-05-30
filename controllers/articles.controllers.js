const { fetchArticleById, fetchArticles, checkArticleExists } = require("../models/articles.models")
const { fetchCommentsByArticleId } = require("../models/comments.models")

exports.getArticles = (req, res, next) => {
    fetchArticles()
        .then((articles) => {
            res.status(200).send({ articles })
        })
        .catch((err) => next(err))
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id)
        .then((article) => {
            res.status(200).send({ article })
        })
        .catch((err) => next(err))
}

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    Promise.all([checkArticleExists(article_id), fetchCommentsByArticleId(article_id)])
        .then((promiseResult) =>{
            const comments = promiseResult[1]
            res.status(200).send({ comments })
        })
        .catch((err) => next(err))
}
const db = require("../db/connection.js")
const { removeBodyProperty } = require("../db/seeds/utils.js")
const { countComments } = require("./comments.models.js")

exports.fetchArticles = () => {
    return db
        .query("SELECT * FROM articles ORDER BY created_at DESC")
        .then(({rows}) => {
            const articles = rows.map((article) => {
                const updatedArticle = removeBodyProperty(article)
                let commentCount = 0
                countComments(article.article_id).then((count) => {
                    commentCount += count
                })
                updatedArticle.comment_count = commentCount
                return updatedArticle
            })
            return articles
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
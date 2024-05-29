const db = require("../db/connection.js")

exports.countComments = (article_id) => {
    return db
        .query("SELECT * FROM comments WHERE article_id = $1", [article_id])
        .then(({rows}) => {
            if(!rows.length){
                return 0
            } else {
                return rows.length
            }
        })
}
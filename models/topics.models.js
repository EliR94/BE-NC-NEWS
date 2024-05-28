const db = require("../db/connection.js")
const fs = require("fs/promises")

exports.fetchTopics = () => {
    return db
        .query("SELECT * FROM topics;")
        .then(({rows}) => rows)
}
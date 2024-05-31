const db = require("../db/connection.js")
const fs = require("fs/promises")

exports.fetchTopics = (topic) => {
    let queryStr = `SELECT * FROM topics`;
    const queryValues = []
    if(topic){
        queryStr += ` WHERE slug = $1`
        queryValues.push(topic)
    }
    return db
        .query(queryStr, queryValues)
        .then(({rows}) => {
            if(!rows.length){
                return Promise.reject({ 
                    status: 404,
                    msg: `Topic: ${topic} not found`
                })
            } else {
                return rows
            }
        })
}
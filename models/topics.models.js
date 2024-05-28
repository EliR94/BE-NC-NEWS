const db = require("../db/connection.js")
const fs = require("fs/promises")

exports.fetchTopics = () => {
    return db
        .query("SELECT * FROM topics;")
        .then(({rows}) => rows)
}

exports.fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, {encoding: "utf-8"}).then((endpointsData) => {
        const parsedEndpointsData = JSON.parse(endpointsData);
        return parsedEndpointsData
    })
}
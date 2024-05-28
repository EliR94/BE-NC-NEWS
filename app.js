const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controllers.js");
const { handleServerErrors } = require("./errors/index.js");

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)


app.use(handleServerErrors)


app.all("*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

module.exports = app;
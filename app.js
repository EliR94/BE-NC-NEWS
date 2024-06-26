const express = require("express");
const app = express();
const cors = require('cors')
const { getTopics } = require("./controllers/topics.controllers.js");
const { getEndpoints } = require("./controllers/api.controllers.js")
const { handleServerErrors, handleCustomErrors, handlePsqlErrors } = require("./errors/index.js");
const { getArticleById, getArticles, getCommentsByArticleId, postCommentByArticleId, patchArticleVotesByArticleId } = require("./controllers/articles.controllers.js");
const { deleteCommentById } = require("./controllers/comments.controllers.js");
const { getUsers } = require("./controllers/users.controllers.js");

app.use(cors())
app.use(express.json())

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.get("/api/users", getUsers)

app.post("/api/articles/:article_id/comments", postCommentByArticleId)

app.patch("/api/articles/:article_id", patchArticleVotesByArticleId)

app.delete("/api/comments/:comment_id", deleteCommentById)


app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


app.all("*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})

module.exports = app;
const { removeCommentById, fetchCommentByCommentId } = require("../models/comments.models")

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params
    fetchCommentByCommentId(comment_id)
    .then(() => {
        removeCommentById(comment_id)
    })
    .then(()=>{
        res.status(204).send()
    })
    .catch((err) => next(err))
}
const { fetchEndpoints } = require("../models/api.models");

exports.getEndpoints = (req, res, next) => {
    return fetchEndpoints()
        .then((endpoints) => {
            res.status(200).send(endpoints)
        })
        .catch((err) => next(err));
}
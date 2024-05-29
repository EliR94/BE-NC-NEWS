const fs = require("fs/promises")

exports.getEndpoints = (req, res, next) => {
    return fs.readFile(`${__dirname}/../endpoints.json`, {encoding: "utf-8"})
        .then((endpointsData) => {
            const parsedEndpointsData = JSON.parse(endpointsData)
            res.status(200).send({ endpoints: parsedEndpointsData })
        })
        .catch((err) => next(err));
}
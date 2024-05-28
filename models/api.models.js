const fs = require("fs/promises")

exports.fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, {encoding: "utf-8"}).then((endpointsData) => {
        const parsedEndpointsData = JSON.parse(endpointsData);
        return parsedEndpointsData
    })
}
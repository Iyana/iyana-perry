var path = require('path');



module.exports = {
    entry: __dirname + "/../web_modules/Perry.js",
    output: {
        path: __dirname + "/../web/js/",
        filename: "Perry.js"
    },
    devtool: "source-map",
    resolve: {
        modules: [
            __dirname + "/../web_modules",
            __dirname + "/../node_modules"
        ]
    }
};

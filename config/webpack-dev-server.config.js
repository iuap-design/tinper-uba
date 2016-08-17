'use strict';
var path = require('path');

var config = {
    contentBase: path.join(temPath, 'dist'),
    hot: true,
    historyApiFallback: true,
    proxy: {
    	"/_webContext_/*": "http://localhost:8080/"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: "",
    stats: {
      colors: true
    }
}

module.exports = config;

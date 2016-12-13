// const fs = require('fs')
const path = require('path')
const express = require('express')
// const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
// const webpackDevServer = require('webpack-dev-server')
const app = express()
const compiler = webpack(WebpackConfig)  
app.use(webpackDevMiddleware(compiler, {
    publicPath: WebpackConfig.output.publicPath, //必须配置
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

// app.use(rewrite('/*', './index.html'))
// app.use(express.static(__dirname))
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
// app.use(webpackHotMiddleware(compiler))

/**
WebpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/","webpack/hot/dev-server");
const compiler = webpack(WebpackConfig)
var server = new WebpackDevServer(compiler, {
     hot: true,// 开启 Hot Module Replacement,页面将会无刷新更新,需要在entry添加"webpack/hot/dev-server" 
     historyApiFallback: true,//响应前台的historyApi,防止刷新后404
     compress: true,//开启资源gzip
     clientLogLevel: "info",// Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.
     publicPath: WebpackConfig.output.publicPath,//必须配置
     stats: {
        colors: true,
        chunks: false
     }
});
server.listen(8080);

 */

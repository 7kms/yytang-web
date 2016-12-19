// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
var utils = require('./utils')
var config = require('./config').dev
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

//入口文件添加热更新
Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
    // 调试时sourceMap的创建规则eval,eval-source-map,inline-source-map...
    devtool: '#inline-source-map', // 只对js文件提供sourceMap eval
    //此配置将传递给webpack-dev-server
    devServer: {
        inline: true,
        hot: true
    },
    output: {
        path: config.assetsRoot, //必须是一个绝对路径,打包后的文件在硬盘上的路径
        filename: utils.assetsPath('js/[name].[chunkhash].js'), //一个入口文件将对应一个出口文件
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'), //异步加载的时候,创建的chunk文件
        publicPath: config.assetsPublicPath//供Webpack Dev Server使用,提供给浏览器中的静态资源(<script> or <link>)引用,可以用于配置到其他服务器或者cdn
    },
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.sourceMap})
    },
    plugins: [
         new webpack.optimize.CommonsChunkPlugin('vendor'),
         new webpack.DefinePlugin({
            'process.env': config.env
         }),
         new webpack.optimize.OccurenceOrderPlugin(),
        
         new webpack.HotModuleReplacementPlugin(),
          //https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
         new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
         new webpack.NoErrorsPlugin(),
         // https://github.com/ampedandwired/html-webpack-plugin
         new HtmlWebpackPlugin(Object.assign({
            filename: 'index.html',//生成的html存放路径，相对于 path
            template: path.resolve(__dirname,'../src/template/index.html'),//html模板路径
            inject: true
         },config.htmlOptions))
    ]
})

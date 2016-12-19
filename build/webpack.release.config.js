// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
var utils = require('./utils')
var config = require('./config').release
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: config.sourceMap ?  '#source-map' : false, 
    output: {
        path: config.assetsRoot, //必须是一个绝对路径,打包后的文件在硬盘上的路径
        filename: utils.assetsPath('js/[name].[chunkhash].js'), //一个入口文件将对应一个出口文件
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'), //异步加载的时候,创建的chunk文件
    },
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.sourceMap, extract: true })
    },
    plugins: [
         // short-circuits all Vue.js warning code
         new webpack.DefinePlugin({
            'process.env': config.env
         }),
         // minify with dead-code elimination
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
         }),
         // optimize module ids by occurence count
         new webpack.optimize.OccurenceOrderPlugin(),
         //https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
         new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin(Object.assign({
            template: path.resolve(__dirname,'../src/template/index.html'),//html模板路径
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        },config.htmlOptions)),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource && /\.js$/.test(module.resource) && 
                    module.resource.indexOf( path.join(__dirname, '../node_modules')) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})

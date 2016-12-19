var utils = require('./utils')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
// const projectRoot = path.resolve(__dirname, '../')
const nodeModulePath = path.join(__dirname, '../node_modules')

module.exports = {
    entry: {
        app: ['./src/app']
    },
    module: {
        // only lint local *.vue files
        // preLoaders: [
        //     {
        //         test: /.vue$/,
        //         loader: 'eslint',
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            { test: /.js$/, exclude: /node_modules/, loader: 'babel' },
            // { 
            //     test: /.html$/, 
            //     exclude: /node_modules/,
            //     loader: 'html',
            //     query:{
            //         interpolate: 'require',
            //         minimize: false
            //     }
            // },
            { 
                test: /.vue$/, 
                exclude: /node_modules/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: '/nolimit/',                
                loader: 'url-loader',
                query: {
                    limit: 10,
                    name: utils.assetsPath('img/[name].[hash:6].[ext]')
                }
            },
            {
                test: /.(eot|ttf|woff|woff2)$/,
                loader: 'file',
                query: {
                    name: utils.assetsPath('font/[name].[hash:6].[ext]')
                }
            },
             {
                test: /.(ico)$/,
                loader: 'file?name=[name].[hash:6].[ext]'
            }
        ]
    },
    resolve: {
        //在search的时候能快速找到该模块
        alias: {
            'vue': path.join(nodeModulePath, 'vue/dist/vue.js'),
            'vuex': path.join(nodeModulePath, 'vuex'),
            'vue-router': path.join(nodeModulePath, 'vue-router/dist/vue-router.js')
        }
        // extensions: ['.js', '.json', '.vue', '.less', '.html']
    },
    vue: {
        cssModules: {
            localIdentName: '[name]-[local]-[hash:base64:5]',
            camelCase: true
        },
        loaders: utils.cssLoaders({ sourceMap: true })
        // loaders: {
        //     css: ExtractTextPlugin.extract("css!autoprefixer?{ browsers: ['last 2 versions']}"),
        //     // you can also include <style lang="less"> or other langauges
        //     less: ExtractTextPlugin.extract("css!less!autoprefixer?{ browsers: ['last 2 versions']}")
        // }
    }
}

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../')
const nodeModulePath = path.join(__dirname, 'node_modules')

module.exports = {
    // 调试时sourceMap的创建规则eval-source-map,inline-source-map...
    devtool: '#inline-source-map', // 只对js文件提供sourceMap

    //此配置将传递给webpack-dev-server
    devServer: { 
        inline: true ,
        hot: true
    },
    entry:{
        app:['./src/app.js']
    },
    output:{
        path:path.resolve(__dirname,'__build__'),//必须是一个绝对路径,打包后的文件在硬盘上的路径
        filename:'[name].js',//一个入口文件将对应一个出口文件
        chunkFilename:'[id].chunk.js',//异步加载的时候,创建的chunk文件
        publicPath:'/__build__/'//供Webpack Dev Server使用,提供给浏览器中的静态资源(<script> or <link>)引用,可以用于配置到其他服务器或者cdn
    },
    module:{
        loaders:[
            {test:/.js$/,include:[path.resolve(__dirname, "src")],loader:'babel'},
            {test:/.vue$/,loader:'vue'},
        ]
    },
    resolve:{
        //在search的时候能快速找到该模块
        alias:{
            'vue':path.join(nodeModulePath,'vue/dist/vue.js'),
            'vuex':path.join(nodeModulePath,'vuex'),
            'vue-router':path.join(nodeModulePath,'vue-router/dist/vue-router.js')
        }
    },
    plugins:[
         new webpack.optimize.CommonsChunkPlugin('public.js'),
         new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
         new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.HotModuleReplacementPlugin()
    ]
}
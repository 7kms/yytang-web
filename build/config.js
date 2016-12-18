var path = require('path')
module.exports = {
    dev:{
        env:{
            NODE_ENV:'"development"'
        },
        port: 8080,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static',
        htmlOptions: {
            filename: 'index.html',
            title: 'magiccube demo'
        }
    },
    release:{
        env:{
            NODE_ENV:'"production"'
        },
        htmlOptions: {
            filename: 'index.html',
            title: 'magiccube demo'
        },
        sourceMap: false,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static'
    },
    test:{
        env:{
            NODE_ENV:'"production"'
        },
        assetsDir: path.resolve(__dirname,'../__dist__')
    }
}
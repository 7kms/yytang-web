var path = require('path')
module.exports = {
    dev:{
        env:{
            NODE_ENV:'"development"'
        },
        port: 3456,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static',
        htmlOptions: {
            filename: 'index.html',
            title: 'Y_众'
        }
    },
    release:{
        env:{
            NODE_ENV:'"production"'
        },
        htmlOptions: {
            filename: 'index.html',
            title: 'Y_众'
        },
        sourceMap: true,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: './',
        assetsSubDir: 'static'
    },
    test:{
        env:{
            NODE_ENV:'"production"'
        },
        assetsDir: path.resolve(__dirname,'../__dist__')
    }
}
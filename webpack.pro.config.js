// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
// const projectRoot = path.resolve(__dirname, '../')
const nodeModulePath = path.join(__dirname, 'node_modules')

module.exports = {
    // 调试时sourceMap的创建规则eval,eval-source-map,inline-source-map...
    // devtool: '#inline-source-map', // 只对js文件提供sourceMap eval
    //  devtool: '#source-map',

    //此配置将传递给webpack-dev-server
    devServer: {
        inline: true,
        hot: true
    },
    entry: {
        app: ['webpack-hot-middleware/client', './src/app']
    },
    output: {
        path: path.resolve(__dirname, '__build__'), //必须是一个绝对路径,打包后的文件在硬盘上的路径
        filename: '[name].js', //一个入口文件将对应一个出口文件
        chunkFilename: '[chunkhash].chunk.js', //异步加载的时候,创建的chunk文件
        publicPath: '/__build__/'//供Webpack Dev Server使用,提供给浏览器中的静态资源(<script> or <link>)引用,可以用于配置到其他服务器或者cdn
    },
    module: {
        loaders: [
            { test: /.js$/, include: [path.resolve(__dirname, 'src')], loader: 'babel' },
            { 
                test: /.vue$/, 
                loader: 'vue',
                options: {
                    cssModules: {
                        localIdentName: '[name]-[local]-[hash:base64:5]',
                        camelCase: true
                    }
                }
            },
            {
                test: /\.css/,
                exclude: /^node_modules$/,
                loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!`
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!less-loader`
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]?[hash]'
                }
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
    plugins: [
         new webpack.optimize.CommonsChunkPlugin('public.js'),
         new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
         }),
         new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoErrorsPlugin(),
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

// https://github.com/shelljs/shelljs
require('shelljs/global')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.release.config')
var config = require('./config').release

env.NODE_ENV = 'production'


var assetsPath = path.join(config.assetsRoot, config.assetsSubDir)
rm('-rf', config.assetsRoot)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

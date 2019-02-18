'use strict'

const path = require('path')

const is_path_relative_then = path_ => path_ && (!path.isAbsolute(path_)) && path_;

const src_path = "./src";
const dist_path = is_path_relative_then(process.env.DIST_PATH) || "./dist/bundle";
const public_path = process.env.PUBLIC_PATH || ""
const dist_without_hash = true;
const dist_without_mainfest = true;
const dist_without_commonchunk = true;

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        // target: 'http://cugtrip.test/',  //测服
        target: 'https://match.cugtrip.com/', //正服
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST  localhost 10.0.0.41  10.0.0.52 192.168.3.26
    port: 8880, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: false
  },

  build: {
    src_path,
    dist_path,
    dist_without_hash,
    dist_without_mainfest,
    dist_without_commonchunk,
    public_path,
    // // Template for index.html
    index: path.resolve(__dirname, '../contest/index.html'),

    // // Paths
    assetsRoot: path.resolve(__dirname, '../contest'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

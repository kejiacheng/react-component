const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');
const path = require('path');
const config = require('./serviceConfig');
const ProxyConfig = require('./proxy');
const proxy = {};

const env = process.env.NODE_ENV;
const runInIE = process.env.RUN_IN_IE;

Object.keys(ProxyConfig).forEach(k => {

  proxy[k] = ProxyConfig[k][env];
  
  if (env === 'local') {
    proxy[k] && (proxy[k].pathRewrite = function(path) {
      const pathArr = path.split('?');
      const hasJson = /\.json$/g.test(path);
    
      proxy[k].rewrite && Object.keys(proxy[k].rewrite).forEach(p => {
        pathArr[0] = pathArr[0].replace(p, proxy[k].rewrite[p]) + (hasJson ? '' : '.json');
      });
      const newPath = pathArr.join('?');
      console.log('替换后的url:', newPath);
      return newPath;
    });
  }
});


// app的名字，可以通过配置此名字，快速打包出一个新的app
const rootPath = path.join(__dirname, './');
const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

const webpackConfig = {

  entry: {
    // todo 增加完整的react redux
    // 一些基础依赖的模块
    vendor: [
      'es5-shim',
      'es5-shim/es5-sham',
      'console-polyfill',
      'babel-polyfill',
      'react',
      'react-dom'
    ],

    // 入口文件
    index: [path.join(srcPath, './index.tsx')]

  },

  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  resolve: {
    alias: {
      ROOT: srcPath, // src目录
    },
    extensions: ["",".ts", ".tsx", ".js", ".json"]
  },

  devtool: 'inline-source-map',

  module: {
    postLoaders: [
      
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },

      {
        test: /\.(gif)$/,
        loader: 'url-loader?name=./images/[name].[ext]&limit=8192'
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?&name=./images/[name].[ext]&limit=1'
      },

      {
        test: /\.(htc)$/,
        loader: 'file-loader?name=./images/[name].[ext]'
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env'  : {
        'NODE_ENV' : JSON.stringify(env)
      },

      __DEV__: env === 'development',
    }),

    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

    new HtmlWebpackPlugin({
      template: path.join(srcPath, './index.html'),
      filename: 'index.html',
      inject: 'body'
    }),

    new ExtractTextPlugin("styles-[hash:5].css"),
    new es3ifyPlugin()
  ],

  devServer: {
    host: '10.1.40.14',
    disableHostCheck: true,
    hot: true,
    inline: true,
    progress: true,
    stats: { colors: true },
    contentBase: path.join(__dirname, './tmp'),
    port: config.port || 9999,
    proxy: proxy
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};

if (runInIE) {
  webpackConfig.module.postLoaders.push({
    test: /\.js$/,
    loaders: ['export-from-ie8/loader']
  });

  delete webpackConfig.devServer.hot;
  delete webpackConfig.devServer.inline;
}

module.exports = webpackConfig;

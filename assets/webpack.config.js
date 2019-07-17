const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => ({
  devtool: 'source-map',
  devServer: {
    compress: true,
    https: true,
    http2: true,
  },
  optimization: {
    runtimeChunk: {
      name: 'shared-runtime'
    },
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: {
      app: ['./js/app.js'].concat(glob.sync('./vendor/**/*.js'))
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../priv/static/js'),
    publicPath: '/js/'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.styl', '.css' ],
    alias: {
      css: path.resolve(__dirname, 'css')
    },
    modules: [
      path.resolve(__dirname, 'js'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        // include: [
        //   // These packages are distributed as es2015 modules, therefore they need
        //   // to be transpiled to es5.
        //   /node_modules(?:\/|\\)lit-element|lit-html/
        // ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
    new CopyWebpackPlugin([{ from: 'static/', to: '../' }])
  ]
});

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'public', 'index.html'),
    path.join(__dirname, 'src', 'index.jsx')
  ],
  node: {
    net: 'empty',
    fs: 'empty',
    tls: 'empty',
    child_process: 'empty',
    './types/standard': 'empty',
    './types/other': 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:8000'
    }
  }
};

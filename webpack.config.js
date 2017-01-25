
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var atImport = require('postcss-import');
var vars = require('postcss-simple-vars');
var customMedia = require('postcss-custom-media');
var nested = require('postcss-nested');
var mediaMinMax = require('postcss-media-minmax');

var entryBase = ['./src/index.js'];
var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  new ExtractTextPlugin('styles.css'),
];

if (process.env.ENV === 'DEV') {
  entryBase.push('webpack-dev-server/client?http://localhost:8080');
  entryBase.push('webpack/hot/only-dev-server');
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      HOSTNAME: JSON.stringify('http://localhost:8000'),
    },
  }));
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (process.env.ENV === 'PROD') {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
}

module.exports = {
  entry: entryBase,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        exclude: /(github-markdown|normalize|react-select)\.css$/,
        // eslint-disable-next-line max-len
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minify!postcss-loader', { allChunks: true }),
      },
      /*{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/img/[name].[ext]',
      },*/
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: [
    atImport({
      path: ['node_modules', './src'],
    }),
    nested(),
    vars(),
    customMedia(),
    mediaMinMax(),
    // Other PostCSS plugins
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
  },
  plugins: plugins,
};

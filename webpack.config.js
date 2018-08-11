const path = require('path');
const Webpack = require('webpack');
const glob = require('glob');

// Create an array of entry points from each of the index files within
// the src folder. These are our individual lambda functions.
const entryArray = glob.sync('./src/**/index.js');

const entryObject = entryArray.reduce((acc, item) => {
  const name = item.replace(/\/src|\/index.js/g, '')
  acc[name] = item;
  return acc;
}, {});

module.exports = {
  mode: 'production',
  entry: entryObject,
  target: 'node',
  output: {
    path: path.join(__dirname, 'functions'),
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2'
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  ],
  optimization: {
    minimize: false
  }
}

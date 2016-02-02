var path = require('path');
module.exports = {
  entry: './public/scripts/main.js',
  output: {
    path: './public/scripts/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {presets: ['es2015', 'react']}}
    ]
  }
};

const path = require('path');
const { transpile } = require('typescript');

module.exports = {
  mode: 'none',
  target: 'node',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: { "class-transformer": false, "class-validator": false, "dotenv": false, "pg": false, "pg-native": false }
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },

};
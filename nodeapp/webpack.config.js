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
    fallback: { "class-transformer": false, "class-validator": false, "dotenv": false, "pg": false, "pg-native": false, "express": false, "yargs": false, "react-native-sqlite-storage": false, "@google-cloud/spanner": false, "nconf": false, "util": false, "typeorm": false, "sql.js": false , "mssql": false, "redis": false, "mongodb": false, "hdb-pool": false, "mysql": false, "mysql2": false, "oracledb": false, "@sap/hana-client": false, "pg-query-stream": false, "typeorm-aurora-data-api-driver": false, "ioredis": false, "better-sqlite3": false, "sqlite3": false}
 },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },

};
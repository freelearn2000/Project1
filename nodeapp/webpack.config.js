
const path = require('path');
const { transpile } = require('typescript');


module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      { test: /\.ts$/, use: { loader: 'ts-loader', options: {transpileOnly} }, exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    fallback: { "ClassTransformer": false, "decorators": false, "interfaces": false, "enums": false, "metadata/MetadataStorage": false, "validation/Validator": false, "container": false, "decorator/decorators": false, "decorator/ValidationOptions": false, "validation/ValidatorConstraintInterface": false, "validation/ValidationError": false, "validation/ValidatorOptions": false, "validation/ValidationArguments": false, "validation/ValidationTypes": false, "validation-schema/ValidationSchema": false, "register-decorator": false, "lib/main": false, "lib/env-options": false, "lib/cli-options": false, "fs": false, "path": false, "os": false, "param-bytes-for-alg": false, "util": false, "uuid": false, "crypto": false, "xml2js": false, "express": false, "nconf": false, "path": false, "winston": false, "connection/ConnectionManager": false, "metadata-args/MetadataArgsStorage": false, "platform/PlatformTools": false, "connection/ConnectionOptionsReader": false, "error/QueryFailedError": false }
  },
};
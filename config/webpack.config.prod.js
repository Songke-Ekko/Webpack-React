'use strict';

const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');

const publicPath = paths.servedPath;

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
  },
  resolve: {
    modules: [paths.appNodeModules, paths.cssModules, path.resolve(paths.appSrc, "public"), path.resolve(paths.appSrc, "utils")],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
      'publicRes':path.resolve(paths.appSrc, "public")
    },
    plugins: [
        new ModuleScopePlugin(paths.appSrc),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [paths.appSrc, paths.specialNodeModules],
        loader: require.resolve('babel-loader'),
        options: {
            // 必须引入 babel-plugin-import 依赖包
            plugins: [
                ['import', [{ libraryName: 'antd', style: true }]],
            ],
        },

      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

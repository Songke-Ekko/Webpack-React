'use strict';

const path = require('path');
const webpack = require('webpack');


// npm start = npm run start 但是其它的命令无法省略 run.


// ①: webpack-cli start:
// function webpackConfigFactory(mode) {
//     return {
//         entry: ['webpack/hot/dev-server' ,path.resolve(__dirname, '../src/app.js')],
//         output: {
//             path: path.resolve(__dirname, '../build'),
//             filename: 'build.js'
//         },
//         devtool: 'eval-source-map',
//         mode,
//         devServer: {
//             contentBase: path.join(__dirname, '../build'),
//             hot: true,
//             open: true,
//             port: 8082,
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)$/,
//                     exclude: /node_modules/,
//                     loader: 'babel-loader',
//                 }
//             ]
//         }
//     }
// };



// ②: scripts start(webpack-dev-middleware + webpackDevServer):
// function webpackConfigFactory(mode) {
//     return {
//         entry: ['webpack/hot/dev-server' ,path.resolve(__dirname, '../src/app.js')],
//         output: {
//             path: path.resolve(__dirname, '../build'),
//             filename: 'build.js',
//             publicPath: '/'
//         },
//         devtool: 'eval-source-map',
//         mode,
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)$/,
//                     exclude: /node_modules/,
//                     loader: 'babel-loader',
//                 }
//             ]
//         },
//         plugins: [
//             new webpack.HotModuleReplacementPlugin(),
//         ]
//     }
// };



// ③: scripts start(react-dev-utils + webpackDevServer):
function webpackConfigFactory(mode) {
    return {
        entry: ['webpack/hot/dev-server' ,path.resolve(__dirname, '../src/app.js')],
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'build.js',
            publicPath: '/'
        },
        devtool: 'eval-source-map',
        mode,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    }
};

module.exports = webpackConfigFactory;
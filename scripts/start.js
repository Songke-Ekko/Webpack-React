// ①: webpack-dev-middleware + webpackDevServer:
// const path = require('path');
// const webpack = require('webpack');
// const express = require('express');
// const webpackConfig = require('../config/webpack.config');
// const createDevServerConfig = require('../config/webpackDevServer.config');
// const webpackDevMiddleware = require('webpack-dev-middleware'); // 中间件

// const DIST_DIR = path.join(__dirname, '../build'); // 设置静态访问文件路径
// const serverConfig = createDevServerConfig();
// const complier = webpack(webpackConfig('development')); // 编译器
// const app = express();

// app.use(webpackDevMiddleware(complier, serverConfig));

// app.use(express.static(DIST_DIR));

// app.listen(8080, () => {
//   console.log('server is running');
// });



// ②: react-dev-utils + webpackDevServer:
'use strict';

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Eejection at: ', promise, 'reason: ', reason);
});

process.env.NODE_ENV = 'development';

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
// chalk：粉笔，为日志打上颜色
const chalk = require('chalk')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');

const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
    .then(port => {
        if (port === null) {
            return;
        }
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = require(paths.appPackageJson).name;
        const urls = prepareUrls(protocol, HOST, port);
        const complier = createCompiler(webpack, config, appName, urls);
        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.publicUrl);
        const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
        const devServer = new WebpackDevServer(complier, serverConfig);
        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }
            if (isInteractive) {
                clearConsole();
            }
            console.log(chalk.cyan('Starting the development server ...\n'));
            openBrowser(urls.localUrlForBrowser);
        });

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                devServer.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });

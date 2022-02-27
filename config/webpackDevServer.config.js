
const path = require('path');
const webpackConfig = require('../config/webpack.config');
const paths = require('./paths');



// ①: webpack-dev-middleware + webpackDevServer:
// function webpackDevServer() {
//     return {
//         contentBase: path.join(__dirname, '../build'),
//         hot: true,
//         historyApiFallback: false,
//         compress: true,
//         publicPath: webpackConfig('development').output.publicPath,
//         open: true,
//     }
// };

// module.exports = webpackDevServer;



// ②: react-dev-utils + webpackDevServer:
// const errorOverlayMiddleware = require('react-error-overlay/middleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

function webpackDevServer(proxy, allowedHost) {
    return {
        contentBase: paths.appPublic,
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        hot: true,
        watchContentBase: true,
        publicPath: webpackConfig('development').output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        inline: true,
        https: protocol === 'https',
        host: host,
        overlay: false,
        historyApiFallback: {
            disableDotRule: true,
        },
        public: allowedHost,
        proxy,
        setup(app) {
            // app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        }
    }
};

module.exports = webpackDevServer;
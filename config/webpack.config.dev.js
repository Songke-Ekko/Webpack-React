'use strict';

const path = require('path');
const paths = require('./paths');
const theme = require('./theme');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const { HotModuleReplacementPlugin } = require('webpack');
require('react-hot-loader')

const publicPath = '/';

function webpackDevConfig() {
    return {
        mode: 'development',
        devtool: 'cheap-eval-source-map',
        entry: [
            paths.appIndexJs,
        ],
        output: {
            path: paths.appBuild,
            pathinfo: true,
            filename: 'bundle.js',
            chunkFilename: '[name].[chunkhash:8].chunk.js',
            publicPath: publicPath,
        },
        // resolve 配置模块如何解析，比如 babel-loader 识别 jsx，但是需要写后缀，extensions 可以省去写后缀的麻烦
        resolve: {
            // 注意文件名称不能相同
            extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less', '.ts', '.tsx'],
            // alias 把导入的关键字替换，比如 components 相当于 '../src/components，起了个别名
            alias: {
                'components': '../src/components',
            },
            // modules 是用来设置搜索的目录，比如 ['../src/components']，那么 src 下的 utils 则可以直接写 import 'utils'，省略 ../src/components/ webpack 会自动查找
            modules: [paths.appNodeModules]
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    // 命中 js 以及 jsx 结尾的文件
                    test: /\.(js|jsx)$/,
                    // 只命中 src 目录下的文件，加快搜索速度
                    include: paths.appSrc,
                    use: [{
                        loader: require.resolve('babel-loader'),
                        options: {
                            // 不需要 .babelrc 配置文件
                            "babelrc": false,
                            "presets": ['react', "env", "es2015"],
                            // "dynamic-import-webpack" 与 .babelrc 一起写会触发 eslint 校验，也有可能是本依赖包会自动带入 eslint 校验，因为本地代码并没有配置 eslint
                            // plugins 里面写 import libraryName 必须引入 babel-plugin-import 依赖包，此代码可以实现 antd 的按需加载
                            // antd -> style: 'css' 需要 css-loader 以及 style-loader 的支持
                            plugins: ["dynamic-import-webpack", 'react-hot-loader/babel', [
                                'import', [{
                                    libraryName: 'antd', style: 'css',
                                }]
                            ]],
                            // 传给 babel-loader 的参数，用于缓存 babel 编辑结果加快重新编译速度
                            cacheDirectory: true,
                        }
                    }],
                },
                // 解析 css 文件
                // 注意: style-loader 一定要写在 css-loader 的前面，因为多个 loader 是从右往左解析的
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // 可以使得 import 'css' 改写为 import styles from 'css'
                                modules: true,
                            }
                        },
                    ]
                },
                // 解析 less
                {
                    test: /\.less$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                                modules: true,
                            }
                        },
                        {
                            loader: require.resolve('less-loader'),
                            options: {
                                modifyVars: theme(),
                                modules: true,
                            }
                        },
                        // style-recources-loader 设置公共的样式文件
                        {
                            loader: require.resolve('style-resources-loader'),
                            options: {
                                patterns: [
                                    path.resolve(__dirname, "../src/common.style.less"),
                                ]
                            }
                        }
                    ]
                },
                // 需要下载 npm 依赖包，ts-loader@4.3.1，typescript，@types/react，@types/node 并且配置 tsconfig.json
                {
                    test: /\.tsx?$/,
                    exclude: paths.appNodeModules,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '../tsconfig.json')
                    },
                }
            ]
        },
        plugins: [
            // 帮助你的入口生成 HTML 文件，否则启动之后有可能是空白页面
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml
            }),
            new HotModuleReplacementPlugin(),
            new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        ],
    };
};

module.exports = webpackDevConfig();
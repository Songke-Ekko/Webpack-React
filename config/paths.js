'use strict';

const path = require('path');
const fs = require('fs');
// const url = require('url');

// fs.realpathSync 返回解析的路径名
// process.cwd() 返回 node.js 进程的当前工作目录
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
};

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// url.parse() 将网址地址解析成网址对象，目前已经不再使用，用 new URL() 代替
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    // const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    const servedUrl = envPublicUrl || (publicUrl ? new URL(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
};

module.exports = {
    dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/app.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    specialNodeModules: resolveApp('node_modules/ws/lib'),
    cssModules: resolveApp('css_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
};
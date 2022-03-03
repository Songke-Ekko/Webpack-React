import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';



// ① 第一种数组写法: 
// const routes = [
//     {
//         path: '/',
//         exact: true,
//         component: IndexContainer,
//         routes: [{
//             path: '/first',
//             exact: true,
//             component: FirstContainer
//         }]
//     }
// ];



// ② 第二种 懒加载 + Component 写法: 
// 嵌套路由父组件不能写 exact

const IndexContainer = Loadable({
    // 下载依赖包 babel-plugin-dynamic-import-webpack，并且 babelrc 里面配置 "plugins": ["dynamic-import-webpack"]
    loader: () => import('../src/containers/IndexContainerTs'),
    loading: () => null,
});

const FirstPageContainer = Loadable({
    loader: () => import('../src/containers/FirstPageContainer'),
    loading: () => null,
});

const routes = () => (
    <Fragment>
        <Switch>
            <Route path="/index" component={IndexContainer} />
            <Route path="/first" component={FirstPageContainer} />
        </Switch>
    </Fragment>
);

export default routes;
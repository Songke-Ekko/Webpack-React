// ① webpack-cli start:
// import React from 'react';
// import ReactDom from 'react-dom';

// ReactDom.render(<h1>{'React 12313'}</h1>, document.getElementById('app'));



// ② react-dev-utils start:
// Polyfill 是一块代码(通常是 Web 上的 JavaScript),用来为旧浏览器提供它没有原生支持的较新的功能
import 'react-hot-loader/patch';

import Client from 'eternal-client-web';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import MyAppContainer from './client';
import { createMyStore } from './store';
import reducer from './reducer';

if (!window.SocketClient) {
    window.SocketClient = Client;
}

export const store = createMyStore(reducer);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.getElementById('app')
    )
};

if (document.getElementById('app')) {
    render(MyAppContainer);
}

if (module.hot) {
    const NextAppContainer = require('./client').default;
    module.hot.accept('./client', () => {
        render(NextAppContainer);
    })
}

export default (
    <AppContainer>
        <MyAppContainer/>
    </AppContainer>
)
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';


class WrapperComponent extends React.Component {
    render() {
        const store = this.props.store;

        return (
            <Provider store={store}>
                <Router>
                    <Routes />
                </Router>
            </Provider>
        )
    }
};

export default WrapperComponent;

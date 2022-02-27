import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

export const createMyStore = (rootReducer) => {
    const middlewares = [];
    const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(createStore);
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}
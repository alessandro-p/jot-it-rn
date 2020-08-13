import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';

const saga_middleware = createSagaMiddleware();

const store = createStore(
    reducers,
    compose(
        applyMiddleware(saga_middleware)
    )
);

export {store};

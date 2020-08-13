import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

import reducers, {ApplicationState} from '../reducers';

const saga_middleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['incomes', 'expenses']
};

const persisted_reducers = persistReducer<ApplicationState>(persistConfig, reducers);

const store = createStore(
    persisted_reducers,
    compose(
        applyMiddleware(saga_middleware)
    )
);
const persistor = persistStore(store);

export {store, persistor};

import {applyMiddleware, compose, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {adminReducer} from './reducers'
import ReduxThunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, adminReducer)

// MIDDLEWARE
const middleWare = store => next => action => {
    return next(action)
}

export default () => {
    let store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(ReduxThunk, middleWare),
            //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ))
    let persistor = persistStore(store)
    return {store, persistor}
}
import {createStore, compose, applyMiddleware} from "redux";
import { persistStore } from "redux-persist";
import { adminReducer } from './reducers'
import ReduxThunk from "redux-thunk";

// MIDDLEWARE
const middleWare = store => next => action => {
    return next(action)
}

export const store = createStore(
    adminReducer
);
export const persistor = persistStore(store);
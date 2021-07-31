import {createStore,applyMiddleware} from "redux";
import { persistStore } from 'redux-persist';
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import persistedReducer from "./rootReducer";


const middlewares = [logger]


const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(...middlewares)) )
const persistor = persistStore(store)


export {store,persistor};
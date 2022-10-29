import {combineReducers,} from "redux";
import createSagaMiddleware from "redux-saga";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import rootSagas from "./rootSagas";
import {configureStore} from "@reduxjs/toolkit";
import userSlice, {initialState} from "./slices/usersSlice";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import cardsSlice from "./slices/cardsSlice";
import fetchUserSlice from "./slices/fetchUserSlice";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    users: userSlice.reducer,
    fetchUser: fetchUserSlice.reducer,
    cards: cardsSlice.reducer,
    router: connectRouter(history)
});

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
]

const store = configureStore( {
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});

sagaMiddleware.run(rootSagas);
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        }
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}
    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;
import {all} from "redux-saga/effects"
import usersSagas from "./sagas/usersSagas";
import notifierSagas from "./sagas/notifierSagas";
import cardsSagas from "./sagas/cardsSagas";
import fetchUserSagas from "./sagas/fetchUserSagas";

export default function* rootSagas(){
    yield all ([
        ...usersSagas,
        ...notifierSagas,
        ...fetchUserSagas,
        ...cardsSagas,
    ]);
};
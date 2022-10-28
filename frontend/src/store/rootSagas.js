import {all} from "redux-saga/effects"
import usersSagas from "./sagas/usersSagas";
import notifierSagas from "./sagas/notifierSagas";

export default function* rootSagas(){
    yield all ([
        ...usersSagas,
        ...notifierSagas,
    ]);
};
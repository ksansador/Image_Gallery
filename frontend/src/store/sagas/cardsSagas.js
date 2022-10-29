import {
    createCardFailure, createCardRequest, createCardSuccess,
    fetchCardsFailure,
    fetchCardsRequest,
    fetchCardsSuccess,
    generateTokenFailure,
    generateTokenRequest, generateTokenSuccess
} from "../actions/cardsActions";
import axiosApi from "../../axiosApi";
import {put, takeEvery} from 'redux-saga/effects';
import {addNotification} from "../actions/notifierActions";
import {push} from "connected-react-router";

export function* fetchCardsSaga({payload: query}) {
    try {
        const response = yield axiosApi('/cards' + query);
        yield put(fetchCardsSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(fetchCardsFailure(e.response.data));
        } else {
            yield put(fetchCardsFailure(e));

        }
    }
}

export function* generateTokenSaga({payload: id}) {
    try {
        const response = yield axiosApi.put('cards/generation/' + id);
        yield put(generateTokenSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(generateTokenFailure(e.response.data));
        } else {
            yield put(generateTokenFailure(e));

        }
    }
}

export function* createCardSaga({payload: cardData}) {
    try {
        yield axiosApi.post('/cards', cardData);
        yield put(createCardSuccess());
        yield put(addNotification({message: 'Card send to request', variant: 'success'}));
        yield put(push('/'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(createCardFailure(e.response.data));
        } else {
            yield put(createCardFailure(e));
        }
    }
}

const cardsSagas = [
    takeEvery(fetchCardsRequest, fetchCardsSaga),
    takeEvery(generateTokenRequest, generateTokenSaga),
    takeEvery(createCardRequest, createCardSaga),
];

export default cardsSagas;
import {
    fetchCardsFailure,
    fetchCardsRequest,
    fetchCardsSuccess,
    generateTokenFailure,
    generateTokenRequest, generateTokenSuccess
} from "../actions/cardsActions";
import axiosApi from "../../axiosApi";
import {put, takeEvery} from 'redux-saga/effects';

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

const cardsSagas = [
    takeEvery(fetchCardsRequest, fetchCardsSaga),
    takeEvery(generateTokenRequest, generateTokenSaga),
];

export default cardsSagas;
import {fetchCardsFailure, fetchCardsRequest, fetchCardsSuccess} from "../actions/cardsActions";
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

const cardsSagas = [
    takeEvery(fetchCardsRequest, fetchCardsSaga),
];

export default cardsSagas;
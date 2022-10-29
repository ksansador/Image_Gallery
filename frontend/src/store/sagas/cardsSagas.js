import {
    createCardFailure,
    createCardRequest,
    createCardSuccess,
    deleteCardFailure,
    deleteCardRequest,
    deleteCardSuccess,
    fetchCardFailure, fetchCardRequest,
    fetchCardsFailure,
    fetchCardsRequest,
    fetchCardsSuccess,
    fetchCardSuccess,
    generateTokenFailure,
    generateTokenRequest,
    generateTokenSuccess, publishCardFailure, publishCardRequest, publishCardSuccess
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

export function* deleteCardSaga({payload: id}) {
    try {
        yield axiosApi.delete('/cards/' + id);
        yield put(deleteCardSuccess());
        yield put(addNotification({message: 'Card deleted', variant: 'success'}));
        yield put(push('/'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(deleteCardFailure(e.response.data));
        } else {
            yield put(deleteCardFailure(e));
        }
    }
}

export function* fetchCardSaga({payload: query}) {
    try {
        const response = yield axiosApi('/cards' + query);
        yield put(fetchCardSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(fetchCardFailure(e.response.data));
        } else {
            yield put(fetchCardFailure(e));
        }
    }
}

export function* publishCardSaga({payload: id}) {
    try {
        yield axiosApi.put('/cards/publish/' + id);
        yield put(publishCardSuccess());
        yield put(addNotification({message: 'Card published', variant: 'success'}));
        yield put(push('/'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(publishCardFailure(e.response.data));
        } else {
            yield put(publishCardFailure(e));
        }
    }
}

const cardsSagas = [
    takeEvery(fetchCardsRequest, fetchCardsSaga),
    takeEvery(generateTokenRequest, generateTokenSaga),
    takeEvery(createCardRequest, createCardSaga),
    takeEvery(deleteCardRequest, deleteCardSaga),
    takeEvery(fetchCardRequest, fetchCardSaga),
    takeEvery(publishCardRequest, publishCardSaga),
];

export default cardsSagas;
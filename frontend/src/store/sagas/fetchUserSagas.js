import {fetchUserFailure, fetchUserRequest, fetchUserSuccess} from "../actions/fetchUserActions";
import axiosApi from "../../axiosApi";
import {put, takeEvery} from 'redux-saga/effects';

export function* fetchUserSaga({payload: id}) {
    try {
        const response = yield axiosApi('/users/' + id);
        yield put(fetchUserSuccess(response.data));
    } catch (e) {
        yield put(fetchUserFailure(e));
    }
}

const fetchUserSagas = [
    takeEvery(fetchUserRequest, fetchUserSaga),
];

export default fetchUserSagas;
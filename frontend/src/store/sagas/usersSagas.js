import {put, takeEvery} from 'redux-saga/effects';
import {push} from "connected-react-router";
import axiosApi from "../../axiosApi";
import {
    facebookRequest,
    loginFailure, loginRequest,
    loginSuccess, logOutFailure, logOutRequest, logOutSuccess,
    registerFailure,
    registerRequest, registerSuccess,
} from "../actions/usersActions";
import {addNotification} from "../actions/notifierActions";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);
        yield put(registerSuccess(response.data));
        yield put(push('/'));
    }catch (e) {
        yield put(registerFailure(e));
    }
}

export function* loginUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users/sessions', userData);
        yield put(loginSuccess(response.data.user));
        yield put(push('/'));
        yield put(addNotification({message:'Login succesful!', variant: 'success'}));

    }catch (e) {
        yield put(loginFailure(e));
    }
}

export function* facebookUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/facebookLogin', userData);
        yield put(loginSuccess(response.data.user));
        yield put(addNotification({message:'Login succesful!', variant: 'success'}));
        yield put(push('/'));
    } catch (e) {
        yield put(loginFailure(e));
    }
}

export  function* logOutSaga({payload: userData}) {
    try {
        const response = yield axiosApi.delete('/users/sessions', {
            headers: {
                'Authorization': userData.token,
            },
        })
        yield put(logOutSuccess(response.data));
        yield put(push('/'));
    } catch (e) {
        yield put(logOutFailure(e));
    }
}

const usersSagas = [
    takeEvery(registerRequest, registerUserSaga),
    takeEvery(loginRequest, loginUserSaga),
    takeEvery(facebookRequest, facebookUserSaga),
    takeEvery(logOutRequest, logOutSaga),

];
export default usersSagas;
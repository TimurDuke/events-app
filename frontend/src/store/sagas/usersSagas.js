import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
    registerUserRequest,
    registerUserFailure,
    registerUserSuccess,
    loginUserFailure,
    loginUserSuccess,
    loginUserRequest,
    facebookLoginRequest,
    logoutUserRequest
} from "../actions/usersActions";

import history from "../../history";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);

        yield put(registerUserSuccess(response.data));
        history.push('/');
    } catch (e) {
        if (e.response && e.response.data) {
            yield put(registerUserFailure(e.response.data));
        } else {
            yield put(registerUserFailure({global: 'No internet'}));
        }
    }
}

export function* loginUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/sessions', userData);

        yield put(loginUserSuccess(response.data));
        history.push('/');
    } catch (e) {
        if (e.response && e.response.data) {
            yield put(loginUserFailure(e.response.data));
        } else {
            yield put(loginUserFailure({global: 'No internet'}));
        }
    }
}

export function* facebookLoginSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/facebookLogin', userData);

        yield put(loginUserSuccess(response.data));
        history.push('/');
    } catch (e) {
        yield put(loginUserFailure(e.response.data));
    }
}

export function* logoutUser({payload: userToken}) {
    try {
        const headers = {'Authorization': userToken};

        yield axiosApi.delete('/users/sessions', {headers});
        history.push('/');
    } catch (e) {
        console.error(e);
    }
}

const usersSagas = [
    takeEvery(registerUserRequest, registerUserSaga),
    takeEvery(loginUserRequest, loginUserSaga),
    takeEvery(facebookLoginRequest, facebookLoginSaga),
    takeEvery(logoutUserRequest, logoutUser),
];

export default usersSagas;


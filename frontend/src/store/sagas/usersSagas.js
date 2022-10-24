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
    logoutUserRequest,
    inviteFriendFailure,
    inviteFriendSuccess,
    inviteFriendRequest,
    deleteFriendFailure,
    deleteFriendSuccess,
    deleteFriendRequest
} from "../actions/usersActions";

import history from "../../history";
import {addNotificationSuccess} from "../../notifications";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);

        yield put(registerUserSuccess(response.data));
        addNotificationSuccess('You have successfully registered.');
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
        addNotificationSuccess('You have successfully login.');
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
        addNotificationSuccess('You have successfully login.');
    } catch (e) {
        yield put(loginUserFailure(e.response.data));
    }
}

export function* logoutUserSaga({payload: userToken}) {
    try {
        const headers = {'Authorization': userToken};

        yield axiosApi.delete('/users/sessions', {headers});
        history.push('/');
    } catch (e) {
        console.error(e);
    }
}

export function* inviteFriendSaga({payload: friendEmail}) {
    try {
        const response = yield axiosApi.post('/users/invite', friendEmail);

        if (response.data) {
            yield put(inviteFriendSuccess(response.data));
            history.push('/');
            addNotificationSuccess('You have successfully added to friends.');
        }
    } catch (e) {
        if (e.response && e.response.data) {
            yield put(inviteFriendFailure(e.response.data));
        } else {
            yield put(inviteFriendFailure({global: 'No internet'}));
        }
    }
}

export function* deleteFriendSaga({payload: friendId}) {
    try {
        const response = yield axiosApi.delete('/users/invite/' + friendId);

        if (response.data) {
            yield put(deleteFriendSuccess(response.data));
            addNotificationSuccess('You have successfully unfriended.');
        }
    } catch (e) {
        yield put(deleteFriendFailure(e));
    }
}

const usersSagas = [
    takeEvery(registerUserRequest, registerUserSaga),
    takeEvery(loginUserRequest, loginUserSaga),
    takeEvery(facebookLoginRequest, facebookLoginSaga),
    takeEvery(logoutUserRequest, logoutUserSaga),
    takeEvery(inviteFriendRequest, inviteFriendSaga),
    takeEvery(deleteFriendRequest, deleteFriendSaga),
];

export default usersSagas;


import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {registerUserRequest, registerUserFailure, registerUserSuccess} from "../actions/usersActions";
import history from "../../history";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);

        yield put(registerUserSuccess(response.data));
        history.push('/');
    } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
            yield put(registerUserFailure(e.response.data));
        } else {
            yield put(registerUserFailure({global: 'No internet'}));
        }
    }
}

const usersSagas = [
    takeEvery(registerUserRequest, registerUserSaga),
];

export default usersSagas;


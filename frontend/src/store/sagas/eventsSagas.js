import {put, takeEvery} from 'redux-saga/effects';
import {
    getEventsFailure,
    getEventsRequest,
    getEventsSuccess, postEventRequest,
    postEventsFailure,
    postEventSuccss
} from "../actions/eventsActions";
import axiosApi from "../../axiosApi";
import history from "../../history";

export function* getEventsSaga() {
    try {
        const response = yield axiosApi('/events');

        yield put(getEventsSuccess(response.data));
    } catch (e) {
        yield put(getEventsFailure(e));
    }
}

export function* postEventSaga({payload: eventData}) {
    try {
        const response = yield axiosApi.post('/events', eventData);

        if (response.data) {
            yield put(postEventSuccss());
            history.push('/');
        }
    } catch (e) {
        if (e.response && e.response.data) {
            yield put(postEventsFailure(e.response.data));
        } else {
            yield put(postEventsFailure({global: 'No internet'}));
        }
    }
}

const eventsSagas = [
    takeEvery(getEventsRequest, getEventsSaga),
    takeEvery(postEventRequest, postEventSaga),
];

export default eventsSagas;
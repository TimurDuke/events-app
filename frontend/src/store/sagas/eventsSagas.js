import {put, takeEvery} from 'redux-saga/effects';
import {
    deleteEventFailure,
    deleteEventRequest,
    deleteEventSuccess,
    getEventsFailure,
    getEventsRequest,
    getEventsSuccess,
    postEventFailure,
    postEventRequest,
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
            yield put(postEventFailure(e.response.data));
        } else {
            yield put(postEventFailure({global: 'No internet'}));
        }
    }
}

export function* deleteEventSaga({payload: eventId}) {
    try {
        const response = yield axiosApi.delete('/events/' + eventId);

        if (response.data) {
            yield put(deleteEventSuccess());
        }
    } catch (e) {
        yield put(deleteEventFailure(e));
    }
}

const eventsSagas = [
    takeEvery(getEventsRequest, getEventsSaga),
    takeEvery(postEventRequest, postEventSaga),
    takeEvery(deleteEventRequest, deleteEventSaga),
];

export default eventsSagas;
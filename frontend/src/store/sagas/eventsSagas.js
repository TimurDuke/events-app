import {put, takeEvery} from 'redux-saga/effects';
import {
    deleteEventFailure,
    deleteEventRequest,
    deleteEventSuccess,
    getEventFailure,
    getEventRequest,
    getEventSuccess,
    getEventsFailure,
    getEventsRequest,
    getEventsSuccess,
    postEventFailure,
    postEventRequest,
    postEventSuccss, editEventFailure, editEventSuccess, editEventRequest
} from "../actions/eventsActions";
import axiosApi from "../../axiosApi";
import history from "../../history";
import {addNotificationSuccess} from "../../notifications";

export function* getEventsSaga() {
    try {
        const response = yield axiosApi('/events');

        yield put(getEventsSuccess(response.data));
    } catch (e) {
        yield put(getEventsFailure(e));
    }
}

export function* getEventSaga({payload: eventId}) {
    try {
        const response = yield axiosApi('/events/' + eventId);

        yield put(getEventSuccess(response.data));
    } catch (e) {
        yield put(getEventFailure(e));
    }
}

export function* postEventSaga({payload: eventData}) {
    try {
        const response = yield axiosApi.post('/events', eventData);

        if (response.data) {
            yield put(postEventSuccss());
            history.push('/');
            addNotificationSuccess('You have successfully created a new event.');
        }
    } catch (e) {
        if (e.response && e.response.data) {
            yield put(postEventFailure(e.response.data));
        } else {
            yield put(postEventFailure({global: 'No internet'}));
        }
    }
}

export function* editEventSaga({payload: event}) {
    try {
        const response = yield axiosApi.put('/events/' + event.id, event.data);

        if (response.data) {
            yield put(editEventSuccess());
            history.push('/');
            addNotificationSuccess(response.data);
        }
    } catch (e) {
        yield put(editEventFailure(e));
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
    takeEvery(getEventRequest, getEventSaga),
    takeEvery(postEventRequest, postEventSaga),
    takeEvery(editEventRequest, editEventSaga),
    takeEvery(deleteEventRequest, deleteEventSaga),
];

export default eventsSagas;
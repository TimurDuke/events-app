import {all} from 'redux-saga/effects';
import usersSagas from "./sagas/usersSagas";
import eventsSagas from "./sagas/eventsSagas";

export default function* rootSagas() {
    yield all([
        ...usersSagas,
        ...eventsSagas
    ]);
};
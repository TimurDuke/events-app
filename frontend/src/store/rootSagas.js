import {all} from 'redux-saga/effects';
import usersSagas from "./sagas/usersSagas";

export default function* rootSagas() {
    yield all([
        ...usersSagas
    ]);
};
import {createSlice} from "@reduxjs/toolkit";

const name = 'events';

const initialState = {
    events: [],
    getEventsLoading: false,
    getEventsError: null,
    postEventLoading: false,
    postEventError: null,
    deleteEventLoading: false,
    deleteEventError: null,
};

const eventsSlice = createSlice({
    name,
    initialState,
    reducers: {
        getEventsRequest(state) {
            state.getEventsLoading = true;
            state.getEventsError = null;
        },
        getEventsSuccess(state, {payload: events}) {
            state.getEventsLoading = false;
            state.events = events;
            state.getEventsError = null;
        },
        getEventsFailure(state, {payload: error}) {
            state.getEventLoading = false;
            state.getEventError = error;
        },
        postEventRequest(state) {
            state.postEventLoading = true;
        },
        postEventSuccss(state) {
            state.postEventLoading = false;
        },
        postEventFailure(state, {payload: error}) {
            state.postEventLoading = false;
            state.postEventError = error;
        },
        clearPostEventErrors(state) {
            state.postEventError = null
        },
        deleteEventRequest(state) {
            state.deleteEventLoading = true;
        },
        deleteEventSuccess(state) {
            state.deleteEventLoading = false;
        },
        deleteEventFailure(state, {payload: error}) {
            state.deleteEventLoading = false;
            state.deleteEventError = error;
        }
    }
});

export default eventsSlice;
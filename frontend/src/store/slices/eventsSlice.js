import {createSlice} from "@reduxjs/toolkit";

const name = 'events';

const initialState = {
    events: [],
    getEventsLoading: false,
    getEventsError: null,
    postEventLoading: false,
    postEventError: null,
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
            state.postEventError = null;
        },
        postEventSuccss(state) {
            state.postEventLoading = false;
            state.postEventError = null;
        },
        postEventsFailure(state, {payload: error}) {
            state.postEventLoading = false;
            state.postEventError = error;
        }
    }
});

export default eventsSlice;
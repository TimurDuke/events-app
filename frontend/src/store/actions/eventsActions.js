import eventsSlice from "../slices/eventsSlice";

export const {
    getEventsRequest,
    getEventsSuccess,
    getEventsFailure,
    postEventRequest,
    postEventSuccss,
    postEventFailure,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFailure,
} = eventsSlice.actions
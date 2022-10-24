import eventsSlice from "../slices/eventsSlice";

export const {
    getEventsRequest,
    getEventsSuccess,
    getEventsFailure,
    postEventRequest,
    postEventSuccss,
    postEventsFailure,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFailure,
} = eventsSlice.actions
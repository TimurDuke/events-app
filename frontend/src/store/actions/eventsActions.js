import eventsSlice from "../slices/eventsSlice";

export const {
    getEventsRequest,
    getEventsSuccess,
    getEventsFailure,

    getEventRequest,
    getEventSuccess,
    getEventFailure,

    postEventRequest,
    postEventSuccss,
    postEventFailure,

    editEventRequest,
    editEventSuccess,
    editEventFailure,

    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFailure,
} = eventsSlice.actions
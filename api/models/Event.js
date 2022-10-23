const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    leadTime: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
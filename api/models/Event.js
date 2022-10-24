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
        validate: {
            validator: date => {
                if (new Date(date).toISOString() > new Date('2030-01-01').toISOString()) {
                    return false;
                }
            },
            message: "The maximum value should be 2030-01-01."
        }
    },
    leadTime: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
const express = require('express');
const auth = require("../middleware/auth");
const Event = require('../models/Event');
const router = express.Router();

const formateLeadTime = leadTime => {
    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    };

    if (+leadTime[1] < 1) {
        return leadTime = leadTime.substring(3) + ' m';
    } else if (+leadTime[0] < 1) {
        leadTime = leadTime.replaceAt(2, '.');
        leadTime = leadTime.replaceAt(0, ' ');
        return leadTime = leadTime.split(' ').join('') + ' h';
    } else {
        return leadTime = leadTime.replaceAt(2, '.') + ' h';
    }
};

router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().sort({date: 1});

        res.send(events);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send({message: "Event with this id not found"});
        }

        res.send(event);

    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        let { title, leadTime, date } = req.body;

        const lead = formateLeadTime(leadTime);

        if (date) {
            date = new Date(date).toISOString();
        }

        const eventData = {title, leadTime: lead, date, author: req.user['_id']};

        const event = new Event(eventData);

        await event.save();

        res.send(event);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let { title, leadTime, date} = req.body;

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send({message: "Event with this id not found!"});
        }

        const lead = formateLeadTime(leadTime);

        if (date) {
            date = new Date(date).toISOString();
        }

        const eventData = {title, leadTime: lead, date};

        await Event.findByIdAndUpdate(event['_id'], eventData);

        res.send({message: "Event successfuly edited"});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).send({message: "Event with this id not found!"});
        }

        await Event.findByIdAndDelete(eventId);

        res.send({message: "The event was successfully deleted."});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;
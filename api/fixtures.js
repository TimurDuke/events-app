const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Event = require('./models/Event');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        displayName: 'User'
    }, {
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        displayName: 'Admin'
    });

    await Event.create({
        author: admin['_id'],
        title: 'Event by admin',
        leadTime: '2.52 h',
        date: '2022-10-22T07:37:08.911Z',
    }, {
        author: admin['_id'],
        title: 'Event by admin 2',
        leadTime: '12.00 h',
        date: '2022-11-01T09:37:08.911Z',
    }, {
        author: user['_id'],
        title: 'Event by user',
        leadTime: '40 m',
        date: '2022-11-10T04:37:08.911Z',
    });

    await mongoose.connection.close();
};

run().catch(console.error);
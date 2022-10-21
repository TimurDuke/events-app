const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/calendar',
        options: {useNewUrlParser: true},
    },
    fb: {
        appId: '434437585477038',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};
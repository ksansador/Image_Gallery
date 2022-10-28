const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/HW95',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '636402171492526',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    },
};
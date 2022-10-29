const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require("./config");

const User = require("./models/User");
const Card = require('./models/Card');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [adminUser, rootUser] = await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin',
    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'User',
    });

    await Card.create({
        user: rootUser._id,
        title: 'Poetry life',
        image: 'fixtures/first.jpg',
        publish: true,
    },{
        user: rootUser._id,
        title: 'Inder the floor',
        image: 'fixtures/second.jpg',
        publish: false,
        token: nanoid(),
    },{
        user: adminUser._id,
        title: 'Metropolitan',
        image: 'fixtures/third1.png',
        publish: true,
    },);

    await mongoose.connection.close();
};

run().catch(console.error);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const app = express();
const port = 8000;

const users = require('./app/users');
const cards = require('./app/cards');
const config = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/cards', cards);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('Mongoose disconnect');
    });
};

run().catch(e => console.error(e));
const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;


const CardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    publish: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: null,
    },
});

CardSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
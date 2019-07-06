const mongoose = require('mongoose');

const authoritiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    mobile_no: {
        type: Number,
        unique: true,
        min: 10,
        max: 10
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    government_id: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String
    },
    aadhar_card_no: {
        type: Number,
        min: 12,
        max: 12
    },
    station_alloted: {
        type: String,
        required: true
    },
    created_on: {
        type: String,
        default: Date()
    },
    date_of_joining: {
        type: String,
        default: '-'
    },
    last_modified_on: {
        type: String,
        default: Date()
    },
    user_type: {
        type: String,
        default: 'employee'
    },
    active_status: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Authorities',authoritiesSchema);
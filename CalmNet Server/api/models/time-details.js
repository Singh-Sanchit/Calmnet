const mongoose = require('mongoose');

const timeDetailsSchema = mongoose.Schema({
    bridge_id: {
        type: Number,
        required: true
    },
    bridge_name: {
        type: String,
        required: true
    },
    station_name: {
        type: String,
        required: true
    },
    records: [{
        time: {
            type: String,
            required: true
        },
        no_of_persons: {
            type: Number,
            required: true
        },
        threshold_crossed: {
            type: Boolean,
            required: true
        }
    }],
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Time-Details', timeDetailsSchema);
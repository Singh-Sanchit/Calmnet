const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    station_name: {
        type: String,
        required: true
    },
    no_of_platforms: {
        type: Number,
        required: true
    },
    bridges: [{
        bridge_id: {
            type: Number,
            required: true
        },
        bridge_name: {
            type: String,
            required: true
        },
        constructed_year: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        connected_platform: {
            type: Array,
            required: true
        },
        bridge_status: {
            type: String,
            default: "working"
        },
        threshold_limit: {
            type: Number
        },
        upper_threshold_limit: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('Stations', stationSchema);
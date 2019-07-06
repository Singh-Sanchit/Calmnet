const Stations = require('../models/stations');

exports.station_getAllRecords = (req, res, next) => {
    Stations
    .find()
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json({
                success: true,
                message: "Station Fetched Successfully",
                flag: 1,
                data: result
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Station Id Does Not Match",
                flag: -1
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "Resource Unavailable At This Moment"
        });
        console.log(
            err +
            "\n" +
            "Problem in fetching station details in database in api/rest/v1/calmnet/time-details/{station_id} url"
        );
    });
};

exports.station_addRecord = (req, res, next) => {
    const station = new Stations({
        station_name: req.body.station_name,
        no_of_platforms: req.body.no_of_platforms,
        bridges: req.body.bridges.map(bridge => {
            return {
                bridge_id: Math.floor(1000 + Math.random() * 9000),
                bridge_name: bridge.bridge_name,
                constructed_year: bridge.constructed_year,
                capacity: bridge.capacity,
                connected_platform: bridge.connected_platform,
                threshold_limit: bridge.threshold_limit,
                upper_threshold_limit: bridge.upper_threshold_limit
            };
        })
    });
    station
        .save()
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Station Added Successfully",
                station_id: result._id
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Resource Unavailable At This Moment"
            });
            console.log(
                err +
                "\n" +
                "Problem in inserting station details in database in api/rest/v1/calmnet/time-details/add url"
            );
        });
};

exports.station_getRecordById = (req, res, next) => {
    Stations
    .find({
        _id: req.params.station_id
    })
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json({
                success: true,
                message: "Station Fetched Successfully",
                flag: 1,
                data: result
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Station Id Does Not Match",
                flag: -1
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "Resource Unavailable At This Moment"
        });
        console.log(
            err +
            "\n" +
            "Problem in fetching station details in database in api/rest/v1/calmnet/time-details/{station_id} url"
        );
    });
};
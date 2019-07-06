const TimeDetails = require('../models/time-details');
const Stations = require('../models/stations');

exports.time_details_getAllRecords = (req, res, next) => {
    TimeDetails
    .find()
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json({
                success: true,
                message: "Bridge Details Fetched Successfully",
                flag: 1,
                data: result
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Record Not Found",
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
            "Problem in fetching station details in database in api/rest/v1/calmnet/time-details/all url"
        );
    });
};

exports.time_details_addRecords = (req, res, next) => {

    Stations.find({
            bridges: {
                $elemMatch: {
                    bridge_name: req.body.bridge_name
                }
            }
        })
        .exec()
        .then(result => {
            if (result.length === 1) {
                let bridgeInfo = {};
                const station_name = result[0].station_name;
                let threshold_crossed = false;
                for (const bridge of result[0].bridges) {
                    if (bridge.bridge_name === req.body.bridge_name) {
                        if (bridge.threshold_limit <= req.body.no_of_persons) {
                            threshold_crossed = true;
                        }
                        bridgeInfo = {
                            bridge_id: bridge.bridge_id,
                            bridge_name: bridge.bridge_name,
                            station_name: station_name,
                            records: [{
                                time: req.body.time,
                                no_of_persons: req.body.no_of_persons,
                                threshold_crossed: threshold_crossed
                            }],
                            date: req.body.date
                        };
                        break;
                    }
                }
                TimeDetails.findOneAndUpdate({
                        date: req.body.date,
                        bridge_name: req.body.bridge_name
                    }, {
                        $push: {
                            records: {
                                time: bridgeInfo.records[0].time,
                                no_of_persons: bridgeInfo.records[0].no_of_persons,
                                threshold_crossed: bridgeInfo.records[0].threshold_crossed
                            }
                        }
                    })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                success: true,
                                message: "Record Entered Successfully"
                            });
                        } else {
                            TimeDetails(bridgeInfo)
                                .save()
                                .then(result => {
                                    res.status(200).json({
                                        success: true,
                                        message: "Record Entered Successfully"
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
                                        "Problem in inserting data in database in api/rest/v1/calm/time-details/add url"
                                    );
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
                            "Problem in fetching data from database in api/rest/v1/calm/time-details/add url"
                        );
                    });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Bridge Name Is Not Registered"
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
                "Problem in fetching data from database in api/rest/v1/calm/time-details/add url"
            );
        });
};

exports.time_details_getRecordByDate = (req, res, next) => {
    TimeDetails
    .find({
        date: req.body.date,
        bridge_name: req.body.bridge_name
    })
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json({
                success: true,
                message: "Bridge Details Fetched Successfully",
                flag: 1,
                data: result
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Record Not Found For Mentioned Date And Bridge Name",
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
            "Problem in fetching station details in database in api/rest/v1/calmnet/time-details/getbydate url"
        );
    });
};
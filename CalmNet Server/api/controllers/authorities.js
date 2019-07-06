const Authorities = require('../models/authorities');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.authorities_register = (req, res, next) => {
    Authorities
        .find({
            government_id: req.body.government_id
        })
        .exec()
        .then(result => {
            if (result.length === 1) {
                //Government Employee Exist In The Database
                res.status(400).json({
                    success: false,
                    message: "Government Employee ID Already Assigned",
                    flag: -1
                });
            } else {
                const authorities = new Authorities({
                    name: req.body.name,
                    government_id: req.body.government_id,
                    station_alloted: req.body.station_alloted
                });
                authorities
                    .save()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            message: "Registration Of Employee Successful",
                            flag: 1
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
                            "Problem in inserting data in database in api/rest/v1/calm/authorities/register url"
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
                "Problem in fetching data from database in api/rest/v1/calm/authorities/register url"
            );
        });
};

exports.authorities_signup = (req, res, next) => {
    Authorities
        .find({
            government_id: req.body.government_id
        })
        .exec()
        .then(result => {
            if (result.length === 1) {
                //Government Employee Exist In The Database
                Authorities
                    .find({
                        email: req.body.email
                    })
                    .exec()
                    .then(result => {
                        if (result.length >= 1) {
                            //Mail Exist In The Database
                            return res.status(400).json({
                                success: false,
                                message: "Email ID Already Exist",
                                flag: -2
                            });
                        } else {
                            Authorities
                                .find({
                                    mobile_no: req.body.mobile_no
                                })
                                .exec()
                                .then(result => {
                                    if (result.length >= 1) {
                                        //Mobile Number Exist In The Database
                                        return res.status(400).json({
                                            success: false,
                                            message: "Mobile Number Already Registered",
                                            flag: -3
                                        });
                                    } else {
                                        bcrypt.hash(req.body.password, null, null, (err, hash) => {
                                            const updateJson = {
                                                name: req.body.name,
                                                gender: req.body.gender,
                                                dob: req.body.dob,
                                                mobile_no: req.body.mobile_no,
                                                address: req.body.address,
                                                city: req.body.city,
                                                state: req.body.state,
                                                email: req.body.email,
                                                password: hash,
                                                aadhar_card_no: req.body.aadhar_card_no,
                                                date_of_joining: Date(),
                                                active_status: true
                                            };
                                            Authorities
                                                .updateOne({
                                                    government_id: req.body.government_id
                                                }, {
                                                    $set: updateJson
                                                })
                                                .exec()
                                                .then(result => {
                                                    return res.status(200).json({
                                                        success: true,
                                                        message: "Registration Successful",
                                                        flag: 1
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
                                                        "Problem in signing up new user in database in api/rest/v1/calmnet/authorities/signup url"
                                                    );
                                                });
                                        });
                                    }
                                });
                        }
                    });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Government Empolyee is not registered",
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
                "Problem in fetching data from database in api/rest/v1/calm/authorities/signup url"
            );
        });
};

exports.authorities_login = (req, res, next) => {
    Authorities.find({
            email: req.body.email
        })
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'Authorization Failed. Email Does Not Exist',
                    flag: -1
                });
            }
            bcrypt.compare(req.body.password, result[0].password, (err, data) => {
                if (err) {
                    return res.status(404).json({
                        succes: false,
                        message: 'Authorization Failed. Password Does Not Match',
                        flag: -2
                    });
                }
                if (data) {
                    const token = jwt.sign({
                            email: result[0].email,
                            userId: result[0]._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        success: true,
                        message: 'Authorization Successful',
                        flag: 1,
                        key: token,
                        data: {
                            name: result[0].name,
                            gender: result[0].gender,
                            dob: result[0].dob,
                            mobile_no: result[0].mobile_no,
                            address: result[0].address,
                            city: result[0].city,
                            state: result[0].state,
                            aadhar_card_no: result[0].aadhar_card_no,
                            station_alloted: result[0].station_alloted
                        }
                    });
                }
                res.status(404).json({
                    success: false,
                    message: 'Authorization Failed. Password Does Not Match',
                    flag: -2
                });
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
                "Problem in fetching data from database in api/rest/v1/calm/authorities/login url"
            );
        });
};

exports.authorities_update = (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Authorities
        .find({
            government_id: req.params.government_id
        })
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: "You Entered An Invalid Id",
                    flag: -2
                });
            }
            if (result[0].user_type === "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Admin Cannot Modify Himself",
                    flag: -1
                });
            } else {
                Authorities.update({
                        government_id: req.params.government_id
                    }, {
                        $set: updateOps
                    })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                success: true,
                                message: 'Employee Updated Successfully',
                                flag: 1
                            });
                        } else {
                            res.status(404).json({
                                success: false,
                                message: "You Entered An Invalid Id",
                                flag: -2
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
                            "Problem in updating data from database in api/rest/v1/calm/authorities/update/{government_id} url"
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
                "Problem in fetching data from database in api/rest/v1/calm/authorities/update/{government_id} url"
            );
        });
};
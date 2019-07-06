const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authoritiesRoutes = require('./api/routes/authorities');

const stationsRoutes = require('./api/routes/stations');

const timedetailsRoutes = require('./api/routes/time-details');

mongoose.connect('mongodb://' + process.env.MONGO_DB_US + ':' + process.env.MONGO_DB_PW + '@ds151292.mlab.com:51292/calmnet', {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use(process.env.PATH_URL_v1 + '/authorities', authoritiesRoutes);

app.use(process.env.PATH_URL_v1 + '/stations', stationsRoutes);

app.use(process.env.PATH_URL_v1 + '/time-details', timedetailsRoutes);

app.use((req, res, next) => {
    const error = new Error('Routes Error Occured. No Match Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;


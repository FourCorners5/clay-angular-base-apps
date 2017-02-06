"use strict";
const http = require('http');
const express = require('express');
const app = express();
const localpath = __dirname;
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', require('./rating'));
app.use('/productspotlight', require('./productspotlight'));
app.use('/assets', express.static(__dirname + '/assets'));


var server = http.createServer(app);
var port = process.env.PORT || 220;
server.listen(port, (err) => {
    if (err)
        return console.log('Cannot Start Server', err);

    console.log(`server is listening on ${port}`);
});
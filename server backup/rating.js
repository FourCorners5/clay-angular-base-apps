const http = require('http');
const express = require('express');
//const app = express();
const localpath = __dirname;
const bodyParser = require('body-parser');
const Connection = require('tedious').Connection;
const fs = require('fs');
const TYPES = require('tedious').TYPES;
const Request = require('tedious').Request;
const config = require('./sql.config');
//app.use(bodyParser.json());

module.exports = (function () {
    'use strict';

    var router = express.Router();

    router.options('/', (request, response) => {
        response.status(200);
        response.end();
    });

    router.post('/', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("GetAverageRating", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push("No rating");
                }
                if (err) {
                    console.log(err);
                }
                connection.callProcedure(reviewRequest);
            });

            var reviewRequest = new Request("GetReviews", function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    response.json(jsonArray);
                    response.end();
                    connection.close();
                }
            });

            request.on('doneInProc', function (rowCount, more, rows) {
                // you can do transformations and such here....
                rows.forEach(function (columns) {
                    var rowObject = {};
                    columns.forEach(function (column) {
                        rowObject[column.metadata.colName] = column.value;
                    });
                    jsonArray.push(rowObject);
                    //response.json(jsonArray);
                    //response.end();
                    //connection.close();
                }, function () {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });

            });

            reviewRequest.on('doneInProc', function (rowCount, more, rows) {
                // you can do transformations and such here....
                var reviewArray = [];
                rows.forEach(function (columns) {
                    var rowObject = {};
                    columns.forEach(function (column) {
                        rowObject[column.metadata.colName] = column.value;
                    });
                    reviewArray.push(rowObject);
                }, function () {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });
                jsonArray.push(reviewArray);
                response.json(jsonArray);
                response.end();
                connection.close();
            });

            //Add Params
            request.addParameter('gameId', TYPES.VarChar, req.game);
            request.addParameter('UserEmail', TYPES.VarChar, req.email);
            reviewRequest.addParameter('gameId', TYPES.VarChar, req.game);

            //Set Connection VAR
            var connection = new Connection(config);

            //Make Connection
            connection.on('connect', function (err) {
                if (err) {
                    console.log("Database connection is not established: \n" + err);
                    process.exit(0);
                } else {
                    console.log("Connected"); // If no error, then good to proceed.
                    connection.callProcedure(request);
                }

            });

        } else {
            response.write('Invalid Call');
            response.status(200);
            response.end();
        }
    });

    router.put('/', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var request = new Request("INSERT INTO Ratings (GameID, Rating, UserEmail, Review) Values('" + req.game + "', " + req.rating + ", '" + req.email + "', '" + req.review + "')", function (err, rowCount, rows) {
                if (err) {
                    connection.close();
                    console.log(err);
                    response.end();
                }
            });

            request.on('doneInProc', function () {
                response.status(200);
                response.end();
            });

            /*
            request.on('doneInProc', function(rowCount, more, rows) {
                // you can do transformations and such here....
                var jsonArray = []
                rows.forEach(function(columns) {
                    var rowObject = {};
                    columns.forEach(function(column) {
                        rowObject[column.metadata.colName] = column.value;
                    });
                    jsonArray.push(rowObject);
                    response.json(jsonArray);
                    response.end();
                    connection.close();
                }, function() {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });
    
            });
    
            */

            //Set Connection VAR
            var connection = new Connection(config);

            //Make Connection
            connection.on('connect', function (err) {
                if (err) {
                    console.log("Database connection is not established: \n" + err);
                    process.exit(0);
                } else {
                    console.log("Connected"); // If no error, then good to proceed.
                    connection.execSql(request);
                }

            });

        } else {
            response.write('Invalid Call');
            response.status(200);
            response.end();
        }
    });

    return router;
})();
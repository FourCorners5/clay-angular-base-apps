const http = require('http');
const express = require('express');
const localpath = __dirname;
const bodyParser = require('body-parser');
const Connection = require('tedious').Connection;
const fs = require('fs');
const TYPES = require('tedious').TYPES;
const Request = require('tedious').Request;
const config = require('./sql.config');

module.exports = (function () {
    'use strict';

    var router = express.Router();

    router.options('/', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/getallbuyerconfigs', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/deletebuyer', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/getbuyerconfig', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/getallspotlightproducts', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/getspotlightproduct', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/createproduct', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/deleteproduct', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/updatespotlightproduct', (request, response) => {
        response.status(200);
        response.end();
    });

    router.options('/updatebuyerconfig', (request, response) => {
        response.status(200);
        response.end();
    });

    router.post('/getallbuyerconfigs', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("GetAllBuyerConfigs", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push([]);
                }
                if (err) {
                    console.log(err);
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
                }, function () {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });
                response.json(jsonArray);
                response.end();
                connection.close();

            });

            //Add Params
            //request.addParameter('productId', TYPES.VarChar, req.product);
            //request.addParameter('UserEmail', TYPES.VarChar, req.email);

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

    router.put('/getallbuyerconfigs', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var request = new Request("INSERT INTO BuyerConfig (Name) Values('" + req.Name + "')", function (err, rowCount, rows) {
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

    router.put('/deletebuyer', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var request = new Request("DELETE SpotlightProducts WHERE BuyerID = " + req.ID + " DELETE BuyerConfig WHERE ID = " + req.ID, function (err, rowCount, rows) {
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

    router.post('/getbuyerconfig', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("GetBuyerConfig", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push([]);
                }
                if (err) {
                    console.log(err);
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
                }, function () {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });
                response.json(jsonArray);
                response.end();
                connection.close();

            });

            //Add Params
            request.addParameter('BuyerID', TYPES.Int, req.ID);

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

    router.post('/getallspotlightproducts', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("GetAllSpotlightProducts", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push([]);
                }
                if (err) {
                    console.log(err);
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
                }, function () {
                    //hacky - this keeps node alive while the async function finshes, 
                    //All of this SHOULD be in a seperate method but, can't spend anymore time on this now... c'est la vie'
                    return true;
                });
                response.json(jsonArray);
                response.end();
                connection.close();

            });

            //Add Params
            request.addParameter('BuyerID', TYPES.Int, req.ID);

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

    router.put('/updatespotlightproduct', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("UpdateSpotlightProduct", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push([]);
                }
                if (err) {
                    console.log(err);
                }
            });

            request.on('doneInProc', function (rowCount, more, rows) {
                response.status(200);
                response.end();
                connection.close();

            });

            //Add Params
            request.addParameter('BuyerID', TYPES.Int, req.BuyerID);
            request.addParameter('ID', TYPES.Int, req.ID);
            request.addParameter('Featured', TYPES.Bit, req.Featured);
            request.addParameter('FeaturedSince', TYPES.VarChar, req.FeaturedSince);
            request.addParameter('OrderBy', TYPES.VarChar, req.OrderBy);

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

    router.put('/deleteproduct', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var request = new Request("DELETE SpotlightProducts WHERE ID = " + req.ID + " AND BuyerID = " + req.BuyerID, function (err, rowCount, rows) {
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

    router.put('/createproduct', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var request = new Request("INSERT INTO SpotlightProducts (BuyerID, ProductID, ProductName, ProductURL, ProductImage, OrderBy) Values(" + req.BuyerID + ", '" + req.ProductID + "', '" + req.ProductName + "', '" + req.ProductURL + "', '" + req.ProductImage + "', " + req.OrderBy + ")", function (err, rowCount, rows) {
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

    router.put('/updatebuyerconfig', (incomingRequest, response) => {
        var req = incomingRequest.body;

        if (req.key == 'delighted') {
            //Create Request OBJ
            var jsonArray = [];

            var request = new Request("UpdateBuyerConfig", function (err, rowCount, rows) {
                if (rowCount === 0 || err) {
                    jsonArray.push([]);
                }
                if (err) {
                    console.log(err);
                }
            });

            request.on('doneInProc', function (rowCount, more, rows) {
                response.status(200);
                response.end();
                connection.close();

            });

            //Add Params
            request.addParameter('ID', TYPES.Int, req.ID);
            request.addParameter('DisplaySeparators', TYPES.Bit, req.DisplaySeparators);
            request.addParameter('SeparatorColor', TYPES.VarChar, req.SeparatorColor);
            request.addParameter('MaximumDisplayTime', TYPES.Int, req.MaximumDisplayTime);
            request.addParameter('DisplayArrows', TYPES.Bit, req.DisplayArrows);
            request.addParameter('DisplayRatings', TYPES.Bit, req.DisplayRatings);
            request.addParameter('Email', TYPES.VarChar, req.Email);

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

    return router;
})();
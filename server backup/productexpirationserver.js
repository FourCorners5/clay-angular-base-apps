"use strict";
const http = require('http');
const express = require('express');
const app = express();
const localpath = __dirname;
const bodyParser = require('body-parser');
const Connection = require('tedious').Connection;
const fs = require('fs');
const TYPES = require('tedious').TYPES;
const Request = require('tedious').Request;
const config = require('./sql.config');
const nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/*BEGIN*/

//Create Request OBJ
var jsonArray = [];

var request = new Request("GetExpiredProducts", function (err, rowCount, rows) {
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

    var organizedData = {};
    jsonArray.forEach(function (product) {
        if (!organizedData[product.Email]) {
            organizedData[product.Email] = [];
        }
        organizedData[product.Email].push({ "ProductID": product.ProductID, "ProductImage": product.ProductImage });
    });

    //DO STUFF HERE
    connection.close();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alerts@prograde.com',
            pass: 'Pr0gr@d3!'
        }
    });

    transporter.use('compile', inlineBase64());

    Object.keys(organizedData).forEach(function (key) {

        var productHTML = '';
        var productString = '';
        organizedData[key].forEach(function (product) {
            console.log(product.ProductID, " ", product.ProductImage.substr(0,10));
            productHTML = productHTML.concat('<div><img src="data:image/png;base64,' + product.ProductImage + '" /><br />' + product.ProductID + "</div>");
            productString = productString.concat(product.ProductID + ', ');
        });
        console.log(productHTML);
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Prograde Alerts" <alerts@prograde.com.com>', // sender address
            to: key, // list of receivers
            subject: 'Update Featured Products', // Subject line
            text: 'Hey! Some products you featured on a buyer\'s slideshow are getting a bit stale. Make sure to log on soon and swap these out:' + productString.substr(0, productString.length-2),
            html: 'Hey! Some products you featured on a buyer\'s slideshow are getting a bit stale. <a href="#" target="_blank">Make sure to log on soon and swap them out.</a><br />' + productHTML
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            process.exit(0);
        });


    });




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
        connection.callProcedure(request);
    }

});


/*END*/


var server = http.createServer(app);
var port = process.env.PORT || 220;
server.listen(port, (err) => {
    if (err)
        return console.log('Cannot Start Server', err);

    console.log(`server is listening on ${port}`);
});
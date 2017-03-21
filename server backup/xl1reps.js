const http = require('http');
const express = require('express');
const localpath = __dirname;
const bodyParser = require('body-parser');
const fs = require('fs');

module.exports = (function () {
    'use strict';

    var router = express.Router();

    router.get('/', (request, response) => {
        response.status(200);
        response.sendFile(localpath + "/assets/xl1data.txt");
    });

    router.put('/', (request, response) => {
        fs.writeFile(localpath + "/assets/xl1data.txt", JSON.stringify(request.body), function (err) {
            console.log(request.body);
            if (err) {
                response.status(501);
                response.send(err);
            }
            else {
                response.status(200);
                response.send();
            }
        });
    });

    return router;
})();
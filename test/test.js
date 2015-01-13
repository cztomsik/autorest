'use strict';

var express = require('express');
var autorest = require('..');
var app = express();

app.use('/api', autorest({dir: __dirname + '/data'}));

app.listen(1234);
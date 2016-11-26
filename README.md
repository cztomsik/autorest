Deprecated [see this](https://github.com/typicode/json-server)
---
# autorest

Automatically scans dir for *.json files and provides REST API for them.

## Usage

    var express = require('express');
    var autorest = require('autorest');
    var app = express();

    app.use('/api', autorest({dir: __dirname + '/data'}));

    ...

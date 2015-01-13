'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var glob = require('glob');
var basename = require('path').basename;
var lodashColl = require('./lodash-coll');

module.exports = autorest;


function autorest(opts){
  var api = express();

  api.use(bodyParser.json());

  _.each(glob.sync(opts.dir + '/*.json'), function(f){
    var collName = basename(f).slice(0, -5);
    var recs = require(f);
    var coll = lodashColl(collName, recs);

    api.use('/' + collName, collApi(coll));
  });

  return api;
}

function collApi(coll){
  var subApi = express();

  subApi.get('/', index);
  subApi.post('/', create);
  subApi.get('/:id', show);
  subApi.post('/:id', update);
  subApi.delete('/:id', destroy);

  return subApi;


  function index(req, res){
    res.send(coll.all());
  }

  function create(req, res){
    res.send(coll.create(req.body));
  }

  function show(req, res){
    res.send(coll.find(req.params.id));
  }

  function update(req, res){
    res.send(coll.update(req.params.id, req.body));
  }

  function destroy(req, res){
    coll.destroy(req.params.id);
    res.end();
  }
}
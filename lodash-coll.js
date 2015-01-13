'use strict';

var _ = require('lodash');

module.exports = lodashColl;


function lodashColl(name, recs){
  return {
    name: name,
    all: all,
    create: create,
    find: find,
    update: update,
    destroy: destroy
  };


  function all(){
    return recs;
  }

  function create(data){
    var rec = _.extend({}, data, {
      id: nextId(recs)
    });

    recs.push(rec);

    return rec;
  }

  function find(id){
    return _.find(recs, {id: +id});
  }

  function update(id, data){
    return _.extend(_.find(recs, {id: +id}), data);
  }

  function destroy(id){
    _.remove(recs, {id: +id});
  }

  function nextId(){
    return (_.last(recs).id || 0) + 1;
  }
}
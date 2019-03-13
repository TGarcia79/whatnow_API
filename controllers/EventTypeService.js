'use strict';

exports.getEventtype = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventTypeId (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "Type" : "aeiou",
  "Description" : "aeiou",
  "Id" : 123456789
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getEventtypeList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "Type" : "aeiou",
  "Description" : "aeiou",
  "Id" : 123456789
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.postEventtypeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventType (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postEventtypeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventTypeId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postEventtypeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventType (String)
  **/
  // no response value expected for this operation
  res.end();
}


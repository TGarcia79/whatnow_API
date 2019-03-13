'use strict';

exports.getLogtypeList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "Description" : "aeiou",
  "Id" : 123456789,
  "Name" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getLogyype = function(args, res, next) {
  /**
   * parameters expected in the args:
  * logTypeId (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "Description" : "aeiou",
  "Id" : 123456789,
  "Name" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.postLogtypeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * logType (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postLogtypeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * logTypeId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postLogtypeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * logType (String)
  **/
  // no response value expected for this operation
  res.end();
}


'use strict';

exports.getSpottype = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotTypeId (Long)
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

exports.getSpottypeList = function(args, res, next) {
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

exports.postSpottypeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotType (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postSpottypeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotTypeId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postSpottypeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotType (String)
  **/
  // no response value expected for this operation
  res.end();
}


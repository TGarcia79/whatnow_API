'use strict';

exports.getUser = function(args, res, next) {
  /**
   * parameters expected in the args:
  * userId (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "Mail" : "aeiou",
  "Username" : "aeiou",
  "Phone" : 1.3579000000000001069366817318950779736042022705078125,
  "Id" : 123456789,
  "Surname" : "aeiou",
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

exports.getUserList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "Mail" : "aeiou",
  "Username" : "aeiou",
  "Phone" : 1.3579000000000001069366817318950779736042022705078125,
  "Id" : 123456789,
  "Surname" : "aeiou",
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

exports.postUserCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * user (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postUserDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * userId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postUserEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * user (String)
  **/
  // no response value expected for this operation
  res.end();
}


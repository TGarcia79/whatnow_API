'use strict';

exports.getSpot = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotId (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "Type" : {
    "Type" : "aeiou",
    "Description" : "aeiou",
    "Id" : 123456789
  },
  "Mail" : "aeiou",
  "Description" : "aeiou",
  "User" : {
    "Mail" : "aeiou",
    "Username" : "aeiou",
    "Phone" : 1.3579000000000001069366817318950779736042022705078125,
    "Id" : 123456789,
    "Surname" : "aeiou",
    "Name" : "aeiou"
  },
  "Address" : "aeiou",
  "Phone" : 1.3579000000000001069366817318950779736042022705078125,
  "NIF" : 1.3579000000000001069366817318950779736042022705078125,
  "Lon" : 1.3579000000000001069366817318950779736042022705078125,
  "Id" : 123456789,
  "Comercial_Name" : "aeiou",
  "Lat" : 1.3579000000000001069366817318950779736042022705078125,
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

exports.getSpotList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "Type" : {
    "Type" : "aeiou",
    "Description" : "aeiou",
    "Id" : 123456789
  },
  "Mail" : "aeiou",
  "Description" : "aeiou",
  "User" : {
    "Mail" : "aeiou",
    "Username" : "aeiou",
    "Phone" : 1.3579000000000001069366817318950779736042022705078125,
    "Id" : 123456789,
    "Surname" : "aeiou",
    "Name" : "aeiou"
  },
  "Address" : "aeiou",
  "Phone" : 1.3579000000000001069366817318950779736042022705078125,
  "NIF" : 1.3579000000000001069366817318950779736042022705078125,
  "Lon" : 1.3579000000000001069366817318950779736042022705078125,
  "Id" : 123456789,
  "Comercial_Name" : "aeiou",
  "Lat" : 1.3579000000000001069366817318950779736042022705078125,
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

exports.postSpotCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * sPOT (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postSpotDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postSpotEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spot (String)
  **/
  // no response value expected for this operation
  res.end();
}


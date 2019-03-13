'use strict';

exports.getEventuserEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (Long)
  * startDate (Date)
  * endDate (Date)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "User" : "",
  "Departure" : "2000-01-23T04:56:07.000+00:00",
  "Event" : {
    "Date_End" : "2000-01-23T04:56:07.000+00:00",
    "Type" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "Date_Start" : "2000-01-23T04:56:07.000+00:00",
    "Description" : "aeiou",
    "Atribute" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "SPOT" : {
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
    },
    "Id" : 123456789,
    "Name" : "aeiou"
  },
  "Id" : 123456789,
  "Arrival" : "2000-01-23T04:56:07.000+00:00"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getEventuserList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "User" : "",
  "Departure" : "2000-01-23T04:56:07.000+00:00",
  "Event" : {
    "Date_End" : "2000-01-23T04:56:07.000+00:00",
    "Type" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "Date_Start" : "2000-01-23T04:56:07.000+00:00",
    "Description" : "aeiou",
    "Atribute" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "SPOT" : {
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
    },
    "Id" : 123456789,
    "Name" : "aeiou"
  },
  "Id" : 123456789,
  "Arrival" : "2000-01-23T04:56:07.000+00:00"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getEventuserUser = function(args, res, next) {
  /**
   * parameters expected in the args:
  * userId (Long)
  * startDate (Date)
  * endDate (Date)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "User" : "",
  "Departure" : "2000-01-23T04:56:07.000+00:00",
  "Event" : {
    "Date_End" : "2000-01-23T04:56:07.000+00:00",
    "Type" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "Date_Start" : "2000-01-23T04:56:07.000+00:00",
    "Description" : "aeiou",
    "Atribute" : {
      "Type" : "aeiou",
      "Description" : "aeiou",
      "Id" : 123456789
    },
    "SPOT" : {
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
    },
    "Id" : 123456789,
    "Name" : "aeiou"
  },
  "Id" : 123456789,
  "Arrival" : "2000-01-23T04:56:07.000+00:00"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}


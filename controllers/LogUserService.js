'use strict';

exports.getLoguser = function(args, res, next) {
  /**
   * parameters expected in the args:
  * userId (Long)
  * startDate (Date)
  * endDate (Date)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "Type" : {
    "Description" : "aeiou",
    "Id" : 123456789,
    "Name" : "aeiou"
  },
  "User" : {
    "Mail" : "aeiou",
    "Username" : "aeiou",
    "Phone" : 1.3579000000000001069366817318950779736042022705078125,
    "Id" : 123456789,
    "Surname" : "aeiou",
    "Name" : "aeiou"
  },
  "Lon" : 1.3579000000000001069366817318950779736042022705078125,
  "Id" : 123456789,
  "Timestamp" : "2000-01-23T04:56:07.000+00:00",
  "Lat" : 1.3579000000000001069366817318950779736042022705078125
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}


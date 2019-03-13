'use strict';

var mysql = require('mysql');
var con = mysql.createPool({
  connectionLimit : 10,
  host: "192.168.1.77",
  port : 3306,
  user: "whatnow",
  password: "Just4Strong!",
  database: "mydb"
});

exports.getEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (Long)
  **/
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "SELECT "
                  + "EVENT.*, "
                  + "TYPE_EVENT.type as TYPE_EVENT_type, "
                  + "SPOT.id as SPOT_id, "
                  + "SPOT.name as SPOT_name, "
                  + "SPOT.commercial_name as SPOT_commercial_name, "
                  + "SPOT.nif as SPOT_nif, "
                  + "SPOT.mail as SPOT_mail, "
                  + "SPOT.phone as SPOT_phone, "
                  + "SPOT.address as SPOT_address, "
                  + "SPOT.description as SPOT_description, "
                  + "SPOT.coordinates as SPOT_coordinates, "
                  + "TYPE_SPOT.type as TYPE_SPOT_type "
                  + "FROM EVENT "
                  + "INNER JOIN TYPE_EVENT ON EVENT.TYPE_EVENT_id = TYPE_EVENT.id "
                  + "INNER JOIN SPOT ON SPOT.id = EVENT.SPOT_id "
                  + "INNER JOIN TYPE_SPOT ON SPOT.TYPE_SPOT_id = TYPE_SPOT.id "
                  + "WHERE EVENT.id = " + args.EventId.value;
    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        throw err;
      }    

      if(Object.keys(result).length > 0) {
        var sql_Atribute = "SELECT "
                         + "ATRIBUTE.type, "
                         + "ATRIBUTE.description "
                         + "FROM ATRIBUTE "
                         + "WHERE EVENT_id = " + result[0].id;

        con.query(sql_Atribute, function (err, result_Atribute, fields) {
          if (err) {
            con.release();
            res.end();
            throw err;
          }

          var event = [{
            "Event" : {
              "Id" : result[0].id,
              "Name" : result[0].name,
              "Date_Start" : result[0].date_start,
              "Date_End" : result[0].date_end,
              "Description" : result[0].description,
              "Type" : result[0].TYPE_EVENT_type,
              "SPOT" : {
                "Id" : result[0].SPOT_id,
                "Name" : result[0].SPOT_name,
                "Comercial_Name" : result[0].SPOT_commercial_name,
                "NIF" : result[0].SPOT_nif,
                "Mail" : result[0].SPOT_mail,
                "Phone" : result[0].SPOT_phone,
                "Address" : result[0].SPOT_address,
                "Description" : result[0].SPOT_description,
                "Coordinates" : result[0].SPOT_coordinates,
                "Type" : result[0].TYPE_SPOT_type
              },
              "Atributes" : result_Atribute
            }
            
          }];
          con.release();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(event));
        });
      }
      else {
        con.release();
        res.end();
      }
    });
  });
  
}

exports.getEventList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "SELECT "
                  + "EVENT.*, "
                  + "TYPE_EVENT.type as TYPE_EVENT_type, "
                  + "SPOT.id as SPOT_id, "
                  + "SPOT.name as SPOT_name, "
                  + "SPOT.commercial_name as SPOT_commercial_name, "
                  + "SPOT.nif as SPOT_nif, "
                  + "SPOT.mail as SPOT_mail, "
                  + "SPOT.phone as SPOT_phone, "
                  + "SPOT.address as SPOT_address, "
                  + "SPOT.description as SPOT_description, "
                  + "SPOT.coordinates as SPOT_coordinates, "
                  + "TYPE_SPOT.type as TYPE_SPOT_type, "
                  + "ATRIBUTE.type as ATRIBUTE_type, "
                  + "ATRIBUTE.description as ATRIBUTE_description "
                  + "FROM EVENT "
                  + "INNER JOIN TYPE_EVENT ON EVENT.TYPE_EVENT_id = TYPE_EVENT.id "
                  + "INNER JOIN SPOT ON SPOT.id = EVENT.SPOT_id "
                  + "INNER JOIN TYPE_SPOT ON SPOT.TYPE_SPOT_id = TYPE_SPOT.id "
                  + "INNER JOIN ATRIBUTE ON ATRIBUTE.EVENT_id = EVENT.id "
                  + "ORDER BY EVENT.id "
                  ;
    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        throw err;
      }

      if(Object.keys(result).length > 0) {
        var eventList = [];
        var attrList = [];
        var resultId = result[0].id;
        var x = 0;
        for (var i in result){
          if (resultId == result[i].id){
            attrList.push([{"type" : result[i].ATRIBUTE_type, "description" : result[i].ATRIBUTE_description}]);
          } else {
            eventList[x] = [{
              "Event" : {
                "Id" : result[i-1].id,
                "Name" : result[i-1].name,
                "Date_Start" : result[i-1].date_start,
                "Date_End" : result[i-1].date_end,
                "Description" : result[i-1].description,
                "Type" : result[i-1].TYPE_EVENT_type,
                "SPOT" : {
                  "Id" : result[i-1].SPOT_id,
                  "Name" : result[i-1].SPOT_name,
                  "Comercial_Name" : result[i-1].SPOT_commercial_name,
                  "NIF" : result[i-1].SPOT_nif,
                  "Mail" : result[i-1].SPOT_mail,
                  "Phone" : result[i-1].SPOT_phone,
                  "Address" : result[i-1].SPOT_address,
                  "Description" : result[i-1].SPOT_description,
                  "Coordinates" : result[i-1].SPOT_coordinates,
                  "Type" : result[i-1].TYPE_SPOT_type,
                },
                "Atributes" : attrList
              }
            }];
            attrList = [];
            attrList.push([{"type" : result[i].ATRIBUTE_type, "description" : result[i].ATRIBUTE_description}]);
            resultId = result[i].id;
            x++;
          }
          if(i == result.length-1){
            eventList[x] = [{
              "Event" : {
                "Id" : result[i].id,
                "Name" : result[i].name,
                "Date_Start" : result[i].date_start,
                "Date_End" : result[i].date_end,
                "Description" : result[i].description,
                "Type" : result[i].TYPE_EVENT_type,
                "SPOT" : {
                  "Id" : result[i].SPOT_id,
                  "Name" : result[i].SPOT_name,
                  "Comercial_Name" : result[i].SPOT_commercial_name,
                  "NIF" : result[i].SPOT_nif,
                  "Mail" : result[i].SPOT_mail,
                  "Phone" : result[i].SPOT_phone,
                  "Address" : result[i].SPOT_address,
                  "Description" : result[i].SPOT_description,
                  "Coordinates" : result[i].SPOT_coordinates,
                  "Type" : result[i].TYPE_SPOT_type,
                },
                "Atributes" : attrList
              }
            }];
          }
          
        }
        con.release();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(eventList));
      }
      else {
        con.release();
        res.end();
      }
    });
  });  
}

exports.postEventCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * event (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postEventDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.postEventEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * event (String)
  **/
  // no response value expected for this operation
  res.end();
}


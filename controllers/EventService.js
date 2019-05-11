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
      console.log(err);
    }
    var sql = "SELECT "
                  + "EVENT.*, "
                  + "TYPE_EVENT.id as TYPE_EVENT_id, "
                  + "TYPE_EVENT.type as TYPE_EVENT_type, "
                  + "TYPE_EVENT.description as TYPE_EVENT_description, "
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
        console.log(err);
      }    

      if(Object.keys(result).length > 0) {
        var sql_Atribute = "SELECT * "
                         + "FROM ATRIBUTE "
                         + "WHERE EVENT_id = " + result[0].id;

        con.query(sql_Atribute, function (err, result_Atribute, fields) {
          if (err) {
            con.release();
            res.end();
            console.log(err);
          }

          var event = [{
            "Event" : {
              "Id" : result[0].id,
              "Name" : result[0].name,
              "Date_Start" : result[0].date_start,
              "Date_End" : result[0].date_end,
              "Description" : result[0].description,
              "Type" : {
                "id" : result[0].TYPE_EVENT_id,
                "type" : result[0].TYPE_EVENT_type,
                "description" : result[0].TYPE_EVENT_description,
              },
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
          console.log(event);
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
  var params = args.query.value;
  var paramsArray = [];
  var filter = " ";
  if(params){
    var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(params);
    if (params == 1){
      filter = "WHERE EVENT.date_start <= '" + datetime + "' AND " + "EVENT.date_end >= '" + datetime + "' "
    } else if (params.includes(",")){
      paramsArray = params.split(",");
      if (paramsArray.length == 4){
        filter = "WHERE ST_Distance_Sphere(SPOT.coordinates, POINT(" + paramsArray[2] + "," + paramsArray[1] + ")) <= " + paramsArray[3] + " ";
        if (paramsArray == 1){
          filter = filter + "AND EVENT.date_start <= '" + datetime + "' AND " + "EVENT.date_end >= '" + datetime + "' ";
        }
      }
    }
  }
  
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      console.log(err);
    }
    var sql = "SELECT "
                  + "EVENT.*, "
                  + "TYPE_EVENT.id as TYPE_EVENT_id, "
                  + "TYPE_EVENT.type as TYPE_EVENT_type, "
                  + "TYPE_EVENT.description as TYPE_EVENT_description, "
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
                  + "ATRIBUTE.id as ATRIBUTE_id, "
                  + "ATRIBUTE.type as ATRIBUTE_type, "
                  + "ATRIBUTE.description as ATRIBUTE_description "
                  + "FROM EVENT "
                  + "INNER JOIN TYPE_EVENT ON EVENT.TYPE_EVENT_id = TYPE_EVENT.id "
                  + "INNER JOIN SPOT ON SPOT.id = EVENT.SPOT_id "
                  + "INNER JOIN TYPE_SPOT ON SPOT.TYPE_SPOT_id = TYPE_SPOT.id "
                  + "LEFT JOIN ATRIBUTE ON ATRIBUTE.EVENT_id = EVENT.id "
                  + filter 
                  + "ORDER BY EVENT.id";
    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        console.log(err);
      }

      if(Object.keys(result).length > 0) {
        var eventList = [];
        var attrList = [];
        var resultId = result[0].id;
        var x = 0;
        for (var i in result){
          if (resultId == result[i].id){
            if (result[i].ATRIBUTE_id || result[i].ATRIBUTE_type || result[i].ATRIBUTE_description)
              attrList.push({"id" : result[i].ATRIBUTE_id, "type" : result[i].ATRIBUTE_type, "description" : result[i].ATRIBUTE_description});
          } else {
            eventList[x] = {
                "Id" : result[i-1].id,
                "Name" : result[i-1].name,
                "Date_Start" : result[i-1].date_start,
                "Date_End" : result[i-1].date_end,
                "Description" : result[i-1].description,
                "Type" : {
                  "id" : result[i-1].TYPE_EVENT_id,
                  "type" : result[i-1].TYPE_EVENT_type,
                  "description" : result[i-1].TYPE_EVENT_description,
                },
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
              };
            attrList = [];
            if (result[i].ATRIBUTE_type || result[i].ATRIBUTE_description)
              attrList.push({"id" : result[i].ATRIBUTE_id, "type" : result[i].ATRIBUTE_type, "description" : result[i].ATRIBUTE_description});
            resultId = result[i].id;
            x++;
          }
          if(i == result.length-1){
            eventList[x] = {
                "Id" : result[i].id,
                "Name" : result[i].name,
                "Date_Start" : result[i].date_start,
                "Date_End" : result[i].date_end,
                "Description" : result[i].description,
                "Type" : {
                  "id" : result[i].TYPE_EVENT_id,
                  "type" : result[i].TYPE_EVENT_type,
                  "description" : result[i].TYPE_EVENT_description,
                },
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
              };
          }
        }
        con.release();
        res.setHeader('Content-Type', 'application/json');
        var json = { "Events" : eventList };
        console.log(json);
        res.end(JSON.stringify(json));
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
  var event = args.Event.value.split(",");
  
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      console.log(err);
    }
    var sql = "insert into mydb.EVENT(name, date_start, date_end, description, SPOT_id, TYPE_EVENT_id)" +
              "values ('" + 
              event[0] + "','" +
              event[1] + "','" +
              event[2] + "','" +
              event[3] + "'," +
              event[4] + "," +
              event[5] + ");";       

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        console.log(err);
      }

      var Event_id = { "id" : result.insertId };
      console.log(Event_id);
      con.release();
      res.end(JSON.stringify(Event_id));
    });
  }); 
  // no response value expected for this operation
}

exports.postEventDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (Long)
  **/
 var id = args.EventId.value;
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      console.log(err);
    }
    var sql = "delete from mydb.EVENT " + 
              "where EVENT.id = " + id;

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        console.log(err);
      }
    });
    console.log("delete Event: " + id);
    con.release();
    res.end();
  }); 
 // no response value expected for this operation
}

exports.postEventEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * event (String)
  **/
 var event = args.Event.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     console.log(err);
   }
   var sql = "update mydb.EVENT " +
             "set " + 
             "name = '" + event[1] + "', " +
             "date_start = '" + event[2] + "', " +
             "date_end = '" + event[3] + "', " +
             "description = '" + event[4] + "', " +
             "SPOT_id = " + event[5] + ", " +
             "TYPE_EVENT_id = " + event[6] + " " +
             "where EVENT.id = " + event[0];

   con.query(sql, function (err, result, fields) {
     if (err) {
       con.release();
       res.end();
       console.log(err);
     }
   });
   console.log("Update Event: "+  event[0]);
   con.release();
   res.end();
 }); 
  // no response value expected for this operation
}

exports.postAtributeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * atribute (String)
  **/
  var atribute = args.Atribute.value.split(",");
  
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      console.log(err);
    }
    var sql = "insert into mydb.ATRIBUTE(EVENT_id, type, description)" +
              "values (" + 
              atribute[0] + ",'" +
              atribute[1] + "','" +
              atribute[2] + "');";

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        console.log(err);
      }

      var Event_id = { "id" : result.insertId };
      console.log(Event_id);
      con.release();
      res.end(JSON.stringify(Event_id));
    });
  }); 
  // no response value expected for this operation
}

exports.postAtributeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (Long)
  **/
 var id = args.AtributeId.value;
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      console.log(err);
    }
    var sql = "delete from mydb.ATRIBUTE " + 
              "where ATRIBUTE.id = " + id;

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        console.log(err);
      }
    });
    console.log("delete Event: " + id);
    con.release();
    res.end();
  }); 
 // no response value expected for this operation
}

exports.postAtributeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * event (String)
  **/
 var atribute = args.Atribute.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     console.log(err);
   }
   var sql = "update mydb.ATRIBUTE " +
             "set " + 
             "type = '" + atribute[1] + "', " +
             "description = '" + atribute[2] + "' " +
             "where ATRIBUTE.id = " + atribute[0];

   con.query(sql, function (err, result, fields) {
     if (err) {
       con.release();
       res.end();
       console.log(err);
     }
   });
   console.log("update Atribute: " + atribute[0]);
   con.release();
   res.end();
 }); 
  // no response value expected for this operation
}
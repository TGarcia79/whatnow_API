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

exports.getEventtype = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventTypeId (Long)
  **/
 con.getConnection(function(err, con) {
  if (err) {
    con.release();
    res.end();
    throw err;
  }
  var sql = "SELECT * "
                + "FROM TYPE_EVENT "
                + "WHERE TYPE_EVENT.id = " + args.EventTypeId.value;
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      
      var typeEvent = {
        "Id" : result[0].id,
        "Type" : result[0].type,
        "Description" : result[0].description
        };
      con.release();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(typeEvent));
                       
    }
    else {
      con.release();
      res.end();
    }
  });
}); 
  
}

exports.getEventtypeList = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
 con.getConnection(function(err, con) {
  if (err) {
    con.release();
    res.end();
    throw err;
  }
  var sql = "SELECT * "
                + "FROM TYPE_EVENT "
                + "ORDER BY TYPE_EVENT.id";
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      var typeEventList = [];
      for (var i in result){
        typeEventList[i] = {
          "Id" : result[i].id,
          "Type" : result[i].type,
          "Description" : result[i].description
          };
      }  
      
      var json = { "EventsTypes" : typeEventList };
      
      con.release();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json));
                       
    }
    else {
      con.release();
      res.end();
    }
  });
});
  
}

exports.postEventtypeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventType (String)
  **/
 var eventType = args.EventType.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     throw err;
   }
   var sql = "insert into mydb.TYPE_EVENT(type, description)" +
             "values ('" + 
             eventType[0] + "','" +
             eventType[1] + "');";

   con.query(sql, function (err, result, fields) {
     if (err) {
       con.release();
       res.end();
       throw err;
     }
     var eventType_id = { "id" : result.insertId };
     con.release();
     res.end(JSON.stringify(eventType_id));
   });
 });
  // no response value expected for this operation
  
}

exports.postEventtypeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventTypeId (Long)
  **/
 var id = args.EventTypeId.value;
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "delete from mydb.TYPE_EVENT " + 
              "where TYPE_EVENT.id = " + id;

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        throw err;
      }
    });
    con.release();
    res.end();
  }); 
  // no response value expected for this operation
}

exports.postEventtypeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * eventType (String)
  **/
 var eventType = args.EventType.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     throw err;
   }
   var sql = "update mydb.TYPE_EVENT " +
             "set " + 
             "type = '" + eventType[1] + "', " +
             "description = '" + eventType[2] + "' " +
             "where TYPE_EVENT.id = " + eventType[0];
             console.log(sql);

   con.query(sql, function (err, result, fields) {
     if (err) {
       con.release();
       res.end();
       throw err;
     }
   });
   con.release();
   res.end();
 }); 
  // no response value expected for this operation
}


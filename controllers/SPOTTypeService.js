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

exports.getSpottype = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotTypeId (Long)
  **/
 con.getConnection(function(err, con) {
  if (err) {
    con.release();
    res.end();
    throw err;
  }
  var sql = "SELECT * "
                + "FROM TYPE_SPOT "
                + "WHERE TYPE_SPOT.id = " + args.spotTypeId.value;
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      
      var typeSpot = {
        "Id" : result[0].id,
        "Type" : result[0].type,
        "Description" : result[0].description
        };
      con.release();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(typeSpot));
                       
    }
    else {
      con.release();
      res.end();
    }
  });
}); 
}

exports.getSpottypeList = function(args, res, next) {
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
                + "FROM TYPE_SPOT "
                + "ORDER BY TYPE_SPOT.id";
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      var typeSpotList = [];
      for (var i in result){
        typeSpotList[i] = {
          "Id" : result[i].id,
          "Type" : result[i].type,
          "Description" : result[i].description
          };
      }  
      
      var json = { "SPOTsTypes" : typeSpotList };
      
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

exports.postSpottypeCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotType (String)
  **/
 var spotType = args.spotType.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     throw err;
   }
   var sql = "insert into mydb.TYPE_SPOT(type, description)" +
             "values ('" + 
             spotType[0] + "','" +
             spotType[1] + "');";

   con.query(sql, function (err, result, fields) {
     if (err) {
       con.release();
       res.end();
       throw err;
     }
     var spotType_id = { "id" : result.insertId };
     con.release();
     res.end(JSON.stringify(spotType_id));
   });
 });
  // no response value expected for this operation
}

exports.postSpottypeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotTypeId (Long)
  **/
 var id = args.spotTypeId.value;
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "delete from mydb.TYPE_SPOT " + 
              "where TYPE_SPOT.id = " + id;

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

exports.postSpottypeEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotType (String)
  **/
 var spotType = args.spotType.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     throw err;
   }
   var sql = "update mydb.TYPE_SPOT " +
             "set " + 
             "type = '" + spotType[1] + "', " +
             "description = '" + spotType[2] + "', " +
             "where SPOT.id = " + spotType[0];

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


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

exports.getSpot = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotId (Long)
  **/

con.getConnection(function(err, con) {
  if (err) {
    con.release();
    res.end();
    throw err;
  }
  var sql = "SELECT "
                + "SPOT.*, "
                + "TYPE_SPOT.type as TYPE_SPOT_type, "
                + "USER.username as USER_username, "
                + "USER.name as USER_name, "
                + "USER.surname as USER_surname, "
                + "USER.mail as USER_mail, "
                + "USER.phone as USER_phone "
                + "FROM SPOT "
                + "INNER JOIN TYPE_SPOT ON SPOT.TYPE_SPOT_id = TYPE_SPOT.id "
                + "INNER JOIN USER ON USER.id = SPOT.USER_id "
                + "WHERE SPOT.id = " + args.SpotId.value;
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      
      var spot = {
          "Id" : result[0].id,
          "Name" : result[0].name,
          "Commercial_Name" : result[0].commercial_name,
          "NIF" : result[0].nif,
          "Mail" : result[0].mail,
          "Phone" : result[0].phone,
          "Address" : result[0].address,
          "Description" : result[0].description,
          "Coordinates" : result[0].coordinates,
          "Type" : result[0].TYPE_SPOT_type,
          "USER" : {
            "Username" : result[0].USER_username,
            "Name" : result[0].USER_name,
            "Surname" : result[0].USER_surname,
            "Mail" : result[0].USER_mail,
            "Phone" : result[0].USER_phone,
          }
        };
      con.release();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(spot));
                       
    }
    else {
      con.release();
      res.end();
    }
  });
});
  
}

exports.getSpotList = function(args, res, next) {
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
                + "SPOT.*, "
                + "TYPE_SPOT.type as TYPE_SPOT_type, "
                + "USER.username as USER_username, "
                + "USER.name as USER_name, "
                + "USER.surname as USER_surname, "
                + "USER.mail as USER_mail, "
                + "USER.phone as USER_phone "
                + "FROM SPOT "
                + "INNER JOIN TYPE_SPOT ON SPOT.TYPE_SPOT_id = TYPE_SPOT.id "
                + "INNER JOIN USER ON USER.id = SPOT.USER_id "
                + "ORDER BY SPOT.id";
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }    

    if(Object.keys(result).length > 0) {
      var spotList = [];
      for (var i in result){
        spotList[i] = {
            "Id" : result[i].id,
            "Name" : result[i].name,
            "Commercial_Name" : result[i].commercial_name,
            "NIF" : result[i].nif,
            "Mail" : result[i].mail,
            "Phone" : result[i].phone,
            "Address" : result[i].address,
            "Description" : result[i].description,
            "Coordinates" : result[i].coordinates,
            "Type" : result[i].TYPE_SPOT_type,
            "USER" : {
              "Username" : result[i].USER_username,
              "Name" : result[i].USER_name,
              "Surname" : result[i].USER_surname,
              "Mail" : result[i].USER_mail,
              "Phone" : result[i].USER_phone,
            }
          };
      }  
      
      var json = { "SPOTs" : spotList };
      
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

exports.postSpotCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * sPOT (String)
  **/
 var spot = args.SPOT.value.split(",");
  
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "insert into mydb.SPOT(name, commercial_name, nif, mail, phone, address, description, coordinates, TYPE_SPOT_id, USER_id)" +
              "values ('" + 
              spot[0] + "','" +//name
              spot[1] + "','" +//com_name
              spot[2] + "','" +//nif
              spot[3] + "','" +//mail
              spot[4] + "','" +//phone
              spot[5] + "','" +//address
              spot[6] + "',ST_GeomFromText('POINT(" +//desc
              spot[8] + " " +//lat
              spot[7] + ")')," +//lon
              spot[9] + "," +//type_spot
              spot[10] + ");";//user

    con.query(sql, function (err, result, fields) {
      if (err) {
        con.release();
        res.end();
        throw err;
      }
      var SPOT_id = { "id" : result.insertId };
      con.release();
      res.end(JSON.stringify(SPOT_id));
    });
  }); 
  // no response value expected for this operation
}

exports.postSpotDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spotId (Long)
  **/
 var id = args.spotId.value;
  con.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.end();
      throw err;
    }
    var sql = "delete from mydb.SPOT " + 
              "where SPOT.id = " + id;

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

exports.postSpotEdit = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spot (String)
  **/
 var spot = args.spot.value.split(",");
  
 con.getConnection(function(err, con) {
   if (err) {
     con.release();
     res.end();
     throw err;
   }
   var sql = "update mydb.SPOT " +
             "set " + 
             "name = '" + spot[1] + "', " +
             "commercial_name = '" + spot[2] + "', " +
             "nif = '" + spot[3] + "', " +
             "mail = '" + spot[4] + "', " +
             "phone = '" + spot[5] + "', " +
             "address = '" + spot[6] + "', " +
             "description = '" + spot[7] + "', " +
             "coordinates = ST_GeomFromText('POINT(" + spot[9] + " " + spot[8] + ")'), " +
             "TYPE_SPOT_id = " + spot[10] + ", " +
             "USER_id = " + spot[11] + " " +
             "where SPOT.id = " + spot[0];

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


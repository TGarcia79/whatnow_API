'use strict';

var url = require('url');


var SPOT = require('./SPOTService');


module.exports.getSpot = function getSpot (req, res, next) {
  SPOT.getSpot(req.swagger.params, res, next);
};

module.exports.getSpotList = function getSpotList (req, res, next) {
  SPOT.getSpotList(req.swagger.params, res, next);
};

module.exports.postSpotCreate = function postSpotCreate (req, res, next) {
  SPOT.postSpotCreate(req.swagger.params, res, next);
};

module.exports.postSpotDelete = function postSpotDelete (req, res, next) {
  SPOT.postSpotDelete(req.swagger.params, res, next);
};

module.exports.postSpotEdit = function postSpotEdit (req, res, next) {
  SPOT.postSpotEdit(req.swagger.params, res, next);
};

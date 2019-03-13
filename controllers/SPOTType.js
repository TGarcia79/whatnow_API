'use strict';

var url = require('url');


var SPOTType = require('./SPOTTypeService');


module.exports.getSpottype = function getSpottype (req, res, next) {
  SPOTType.getSpottype(req.swagger.params, res, next);
};

module.exports.getSpottypeList = function getSpottypeList (req, res, next) {
  SPOTType.getSpottypeList(req.swagger.params, res, next);
};

module.exports.postSpottypeCreate = function postSpottypeCreate (req, res, next) {
  SPOTType.postSpottypeCreate(req.swagger.params, res, next);
};

module.exports.postSpottypeDelete = function postSpottypeDelete (req, res, next) {
  SPOTType.postSpottypeDelete(req.swagger.params, res, next);
};

module.exports.postSpottypeEdit = function postSpottypeEdit (req, res, next) {
  SPOTType.postSpottypeEdit(req.swagger.params, res, next);
};

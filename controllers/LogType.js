'use strict';

var url = require('url');


var LogType = require('./LogTypeService');


module.exports.getLogtypeList = function getLogtypeList (req, res, next) {
  LogType.getLogtypeList(req.swagger.params, res, next);
};

module.exports.getLogyype = function getLogyype (req, res, next) {
  LogType.getLogyype(req.swagger.params, res, next);
};

module.exports.postLogtypeCreate = function postLogtypeCreate (req, res, next) {
  LogType.postLogtypeCreate(req.swagger.params, res, next);
};

module.exports.postLogtypeDelete = function postLogtypeDelete (req, res, next) {
  LogType.postLogtypeDelete(req.swagger.params, res, next);
};

module.exports.postLogtypeEdit = function postLogtypeEdit (req, res, next) {
  LogType.postLogtypeEdit(req.swagger.params, res, next);
};

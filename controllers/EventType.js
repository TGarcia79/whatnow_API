'use strict';

var url = require('url');


var EventType = require('./EventTypeService');


module.exports.getEventtype = function getEventtype (req, res, next) {
  EventType.getEventtype(req.swagger.params, res, next);
};

module.exports.getEventtypeList = function getEventtypeList (req, res, next) {
  EventType.getEventtypeList(req.swagger.params, res, next);
};

module.exports.postEventtypeCreate = function postEventtypeCreate (req, res, next) {
  EventType.postEventtypeCreate(req.swagger.params, res, next);
};

module.exports.postEventtypeDelete = function postEventtypeDelete (req, res, next) {
  EventType.postEventtypeDelete(req.swagger.params, res, next);
};

module.exports.postEventtypeEdit = function postEventtypeEdit (req, res, next) {
  EventType.postEventtypeEdit(req.swagger.params, res, next);
};

'use strict';

var url = require('url');


var Event = require('./EventService');


module.exports.getEvent = function getEvent (req, res, next) {
  Event.getEvent(req.swagger.params, res, next);
};

module.exports.getEventList = function getEventList (req, res, next) {
  Event.getEventList(req.swagger.params, res, next);
};

module.exports.postEventCreate = function postEventCreate (req, res, next) {
  Event.postEventCreate(req.swagger.params, res, next);
};

module.exports.postEventDelete = function postEventDelete (req, res, next) {
  Event.postEventDelete(req.swagger.params, res, next);
};

module.exports.postEventEdit = function postEventEdit (req, res, next) {
  Event.postEventEdit(req.swagger.params, res, next);
};

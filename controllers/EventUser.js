'use strict';

var url = require('url');


var EventUser = require('./EventUserService');


module.exports.getEventuserEvent = function getEventuserEvent (req, res, next) {
  EventUser.getEventuserEvent(req.swagger.params, res, next);
};

module.exports.getEventuserList = function getEventuserList (req, res, next) {
  EventUser.getEventuserList(req.swagger.params, res, next);
};

module.exports.getEventuserUser = function getEventuserUser (req, res, next) {
  EventUser.getEventuserUser(req.swagger.params, res, next);
};

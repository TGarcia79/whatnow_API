'use strict';

var url = require('url');


var LogUser = require('./LogUserService');


module.exports.getLoguser = function getLoguser (req, res, next) {
  LogUser.getLoguser(req.swagger.params, res, next);
};

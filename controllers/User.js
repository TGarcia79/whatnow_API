'use strict';

var url = require('url');


var User = require('./UserService');


module.exports.getUser = function getUser (req, res, next) {
  User.getUser(req.swagger.params, res, next);
};

module.exports.getUserList = function getUserList (req, res, next) {
  User.getUserList(req.swagger.params, res, next);
};

module.exports.postUserCreate = function postUserCreate (req, res, next) {
  User.postUserCreate(req.swagger.params, res, next);
};

module.exports.postUserDelete = function postUserDelete (req, res, next) {
  User.postUserDelete(req.swagger.params, res, next);
};

module.exports.postUserEdit = function postUserEdit (req, res, next) {
  User.postUserEdit(req.swagger.params, res, next);
};

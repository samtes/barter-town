'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');

  app.get('/', d, home.index);
  app.get('/register', d, users.auth);
  app.get('/users/:id', d, users.show);
  app.post('/register', d, users.register);
  app.post('/login', d, users.login);
  app.post('/logout', d, users.logout);
  console.log('Routes Loaded');
  fn();
}


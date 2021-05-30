'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  require('./router/login')(app)
  require('./router/home')(app)
  require('./router/hear')(app)
  require('./router/write')(app)
  require('./router/pcRouter/resume')(app)
  require('./router/pcRouter/userList')(app)
  require('./router/pcRouter/article')(app)
};

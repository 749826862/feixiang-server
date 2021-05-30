/* eslint valid-jsdoc: "off" */

'use strict';
const mysqlConfig = require('./config.mysql')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592743057005_4638';

  // add your middleware config here
  config.middleware = ['jsonWebToken']; 
  //配置不需要tocken验证的路由
  config.jsonWebToken = {
    allowed:[
      '/app/user/login',
      '/public/avatar/upload'
    ]
  }

  config.api = 'http://m.kugou.com'     //酷狗api
  config.juheApi = 'http://v.juhe.cn'   //聚合数据api
  config.uploadDir = 'app/public/avatar/upload'   // 图片文件保存路径

  //secret是加密条件字符串
  config.jwt = {
    secret: "749826862"
  };

  config.mysql = {
    ...mysqlConfig
  }

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.security= {
    csrf: {
      enable:false,
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

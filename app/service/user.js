'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  //获取用户信息
  async getUserInfo(info) {
    let user = await this.app.mysql.get('user_list',{ username: info.username, isuser: 1 })
    return this.ctx.formatJson(user)
  }

  //错误登录次数
  async errorNum(info,num){
    const row = {
      loginnum: ++num
    };
    const options = {
      where: {
        username: info.username,
        isuser: 1
      }
    };
    let result = await this.app.mysql.update('user_list',row,options)
    
    return result.affectedRows === 1
  }
}

module.exports = UserService;

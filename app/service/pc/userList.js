'use strict';

const mkdirp = require('mkdirp');
const path = require("path");
const moment = require('moment')

const Service = require('egg').Service;

class UserListService extends Service {
  // 查询用户列表
  async query(name) {
    let { app } = this
    // let result = await app.mysql.select('user_list', {
    //   columns: ['username', 'userage', 'usersex', 'uservip', 'logintime', 'id']
    // })
    const columns =  ['username', 'userage', 'usersex', 'role_name', 'logintime', 'a.id']
    let result = await app.mysql.query(`select ${columns.join(',')} from user_list as a,role as b where a.uservip = b.id and isuser=1 and  username like '%${name}%'`)
    return result
  }

  // 新增用户
  async createUser(user){
    const { app } = this
    const parmrs = {
      ...user,
      isuser: 1,
      uservip: 1,
      logintime: null,
      loginnum: 0
    }
    let result =await app.mysql.insert('user_list', parmrs)
    return result.affectedRows === 1
  }

  // 删除
  async del(id){
    const { ctx, app } = this
    const option = {
      where: {
        id
      }
    }
    const result = await this.app.mysql.update('user_list',{ isuser: 2},option)
    return result.affectedRows === 1
  }

  // 上传用户图像
  async upload(filename){
    // 1.获取当前日期
    let day = moment().format('YYYYMMDD');
    // 2.创建图片保存的路径
    let dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir); // 不存在就创建目录
    let date = Date.now(); // 毫秒数
    // 返回图片保存的路径
    let uploadDir = path.join(dir, date + path.extname(filename));
    // app\public\avatar\upload\20200312\1536895331666.png
    return {
      uploadDir,
      saveDir: this.ctx.origin + uploadDir.slice(3).replace(/\\/g, '/')
    }
  }
}

module.exports = UserListService;

'use strict';

/**
 * egg中的service主要是处理数据层的逻辑，如获取数据库中的数据，拉去远程数据等
 * 
 * 一个service可以被多个controller调用, this.ctx.service
 * 
 * service之间可以相互调用
 */


const Service = require('egg').Service;

class HomeService extends Service {

  async getMenu(){
    let { uservip } = this.ctx.auth
    let role = await this.app.mysql.get('role',{ id: uservip})
    let menuList = await this.app.mysql.select('user_role',{ 
    where:{role_id: this.ctx.formatJson(role).id}, 
    columns: ['auth_name', 'path','bg_color','ishow' ] })
    return {
      role_name: this.ctx.formatJson(role).role_name,
      list: menuList
    }
  }

  async getData() {
    let list = "我是service中的方法"

    let api = this.config.api+'/api/v3/tag/list?pid=0&apiver=2&plat=0'

    //egg中的curl拉取远程数据
    let arr = this.ctx.curl(api)
    return arr
  }
}

module.exports = HomeService;

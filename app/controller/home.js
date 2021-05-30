'use strict';


/**
 * egg 中controller为控制层，主要处理业务逻辑，数据获取尽量使用service层
 * 
 * controller之间不能相互调用
 * 
 * 
 */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  //获取首页菜单
  async getMenu() {
    const { ctx } = this;
    const menu = await ctx.service.home.getMenu()
    await this.ctx.returnSucc('成功',0,200, menu)
  }

  async login(){
    //注意在egg中的异步问题
    let str =await this.ctx.service.home.getData()
    let arr = JSON.parse(str.data)

    this.ctx.body = arr
  }


}

module.exports = HomeController;

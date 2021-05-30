'use strict';


/**
 * 听   控制器
 * 
 */

const Controller = require('egg').Controller;

class HearController extends Controller {
    //获取首页歌单
  async getMuiscList() {
    let parms = this.ctx.query
    let data = await this.service.hear.musicSingle(parms.page)
    if (data) {
        await this.ctx.returnSucc('成功',0,200,JSON.parse(data.data.toString()).plist.list)
    }else{
        await this.ctx.returnSucc('获取歌单失败',0,-100)
    }
  }

  //获取首页新歌
  async getNewMusic(){
    let data = await this.service.hear.musicNew()
    if (data) {
        await this.ctx.returnSucc('成功',0,200,JSON.parse(data.data.toString()))
    }else{
        await this.ctx.returnSucc('获取歌单失败',0,-100)
    }
  }

  //获取单首音乐详情
  async getInfoMusic(){
    let parms = this.ctx.query
    let data = await this.service.hear.musicInfo(parms.hash)
    if (data) {
        await this.ctx.returnSucc('成功',0,200,data)
    }else{
        await this.ctx.returnSucc('获取歌曲信息失败',0,-100)
    }
  }
  
}

module.exports = HearController;

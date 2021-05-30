'use strict';

/**
 * 写    模块
 * 
 */


const Controller = require('egg').Controller;

class WriteController extends Controller {
  //获取新闻列表
  async getarticleList(){
    let parms = this.ctx.query
    let data = await this.service.write.articleInfo(parms.type)
    if (data) {
      if (['wenku','weifabu'].includes(parms.type)) {
        await this.ctx.returnSucc('成功',0,200,{result:{data}})
      }else{
        await this.ctx.returnSucc('成功',0,200,JSON.parse(data.data.toString()))
      }
    }else{
        await this.ctx.returnSucc('获取新闻列表失败',0,-100)
    }
  }

  //创建文章接口
  async createArticle(){
    let parms = this.ctx.request.body
    let result = await this.service.write.articleCreate(parms)
    if (result.affectedRows === 1) {
        await this.ctx.returnSucc('成功',0,200,parms.status?'文章发布成功':'文章创建成功')
    }else{
        await this.ctx.returnSucc('创建文章失败',0,-100)
    }
  }

  //查询文章接口
  async queryArticle(){
    let release = []        //已发布文章
    let noRelease = []      //未发布文章
    let result = await this.service.write.articleQuery()
    if (result) {
      result.map(item=> item.status == 0?noRelease.push(item):release.push(item))
      await this.ctx.returnSucc('成功',0,200,{release,noRelease})
    }else{
      await this.ctx.returnSucc('查询文章失败',0,-100)
    }
  }


}

module.exports = WriteController;

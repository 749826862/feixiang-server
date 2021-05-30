'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 查询文章列表
   */
   async query(){
    const  { ctx } = this
    const result = await ctx.service.pc.article.query()
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    }else {
      await ctx.returnSucc('error', 1, 500, '查询错误')
    }
  }
}

module.exports = ArticleController;

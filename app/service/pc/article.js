'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
   //查询所有文章列表
  async query(){
    const { ctx, app } = this
    const userId = ctx.auth.id
    const result = await this.app.mysql.select('article_list',{ 
      where:{user_id: userId},
      columns: ['id', 'title', 'content','createData','status', 'person', 'click_num', 'approval'] })
    return result
  }
}

module.exports = ArticleService;

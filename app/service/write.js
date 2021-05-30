'use strict';

/**
 * 写
 * 
 */


const Service = require('egg').Service;

class WriteService extends Service {
 
   //获取新闻头条列表
  async articleInfo(parmas) {
    let data = null
    try{
      if (['wenku','weifabu'].includes(parmas)) {
        let status = parmas == 'wenku'?1:0
        const result = await this.app.mysql.select('article_list',{where: {status}})
        data = this.ctx.formatJson(result)
      }else{
        let url = this.config.juheApi+'/toutiao/index?key=99b8f62cb574b724fdfe2775e9903d3b&type='+parmas
        //egg中的curl拉取远程数据
        data = this.ctx.curl(url)
      }
      return data
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  //创建文章
  async articleCreate(parmas){
    try{
      let insertData = {
        title:parmas.article_title,
        content:parmas.article_content,
        person:this.ctx.auth.username,
        status:parmas.status?1:0,
        disable:1,
        user_id:this.ctx.auth.id
      }
      const result = await this.app.mysql.insert('article_list', insertData); 
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  //查询文章
  async articleQuery(){
    try{
      const result = await this.app.mysql.select('article_list',{where: {user_id: this.ctx.auth.id}})
      return this.ctx.formatJson(result)
    }
    catch(error){
      console.log(error)
      return null
    }
  }

}

module.exports = WriteService;

'use strict';

/**
 * 听  数据获取页面
 * 
 */



const Service = require('egg').Service;

class HearService extends Service {
  //获取歌单数据
  async musicSingle(page) {
    try{
      let url = this.config.api+'/plist/index&json=true&page='+page
      //egg中的curl拉取远程数据
      let data = this.ctx.curl(url)
      return data
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  //获取新歌数据
  async musicNew() {
    try{
      let url = this.config.api+'/?json=true'
      //egg中的curl拉取远程数据
      let data = this.ctx.curl(url)
      return data
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  
  //获取单首音乐详情
  async musicInfo(hash) {
    try{
      let url = this.config.api+'/yy/index.php?r=play/getdata&hash='+hash
      //egg中的curl拉取远程数据
      // let data = this.ctx.curl(url)
      return url
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}

module.exports = HearService;

'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  //生成token
  async getToken(user) {
    //生成token
    const token = this.app.jwt.sign({
      ...user
    },this.config.jwt.secret,{
      expiresIn: '10000s',
    })

    //保存到cookie中
    this.ctx.cookies.set('token',token,{
      encrypt:true
    })
    return token
  }

  //登录
  async login(){
    // 路由传参获取
    let parms = this.ctx.query
    let user =  await this.ctx.service.user.getUserInfo(parms)
    let {password, loginnum, username, uservip, logintime, userimg } = user
    if (user && password == parms.password && loginnum <= 5) {
     let token = await this.getToken(user)
     await this.ctx.returnSucc('登录成功',0,200,{token, user: {username, uservip, logintime, userimg}})
    }else if(user && user.loginnum >= 5){
      await this.ctx.returnSucc('账号已锁定',0,-100)
    }else if(user){
      await this.ctx.returnSucc(`用户名或密码错误,剩余${4-loginnum}次机会`,0,-100)
      await this.ctx.service.user.errorNum(parms, loginnum) 
    }else{
      await this.ctx.returnSucc(`用户名或密码错误`,0,-100)
    }
    // console.log(user)
    //动态路由传参
    // let id= this.ctx.params
    // this.ctx.body = id

  }

  //写入错误登录次数
  async loginNum(){

  }

  //注册
  async sigin(){

  }

}

module.exports = LoginController;

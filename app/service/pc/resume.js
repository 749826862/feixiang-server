'use strict';

/**
 * pc, 简历server层
 */

const moment = require('moment')

const Service = require('egg').Service;

class ResumeService extends Service {
  //创建简历
  async create(parms) {
    const { ctx, app } = this
    // const results = await this.app.mysql.query('update posts set hits = (hits + ?) where id = ?', [1, postId]);
    const base = {
        resume_id: (new Date().getTime()).toString().substr(-4) +1,
        resume_name: parms.resumeName,
        resume_user: parms.resumePerson,
        resume_emai: parms.resumeEmail,
        resume_experience: parms.resumeExperience,
        resume_locale: parms.resumePlace,
        private: parms.resumeOpen,
        resume_intention: parms.resumeIntention,
        user_id: ctx.auth.id,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const result = await app.mysql.insert('resume', base);
    const values = parms.list.map(ele => {
        return [ele.sight, moment(ele.date[0]).format('YYYY-MM-DD'), moment(ele.date[1]).format('YYYY-MM-DD'), ele.price, ele.info, +base.resume_id]
    })
    const resultList = await app.mysql.query(`insert into experience values ?`, [values])
    return result.affectedRows === 1
  }

  //查询所有简历模板
  async query(){
    const { ctx, app } = this
    const userId = ctx.auth.id
    const result = await this.app.mysql.select('resume',{ 
      where:{user_id: userId, isDel: 0},
      columns: ['resume_id', 'resume_name', 'resume_user','resume_experience','resume_locale', 'resume_intention', 'private', 'createTime', 'resume_intention', 'resume_locale' ] })
    return result
  }

  //删除简历模板
  async del(id){
    const { ctx, app } = this
    const userId = ctx.auth.id
    const option = {
      where: {
        user_id: userId,
        resume_id: id
      }
    }
    const result = await this.app.mysql.update('resume',{ isDel: 1},option)
    return result.affectedRows === 1
  }

}

module.exports = ResumeService;

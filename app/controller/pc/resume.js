'use strict';

/**
 * pc端， 简历模块接口文件
 * 
 */

// 定义创建接口的请求参数规则
// resumeIntention: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
const createRule = {
    resumeEmail: { type: 'string', required: true },
    resumeExperience: 'number',
    resumeIntention: { type: 'string', required: true },
    resumeName: { type: 'string', required: true },
    resumeOpen: { type: 'number', required: true },
    resumePerson: { type: 'string', required: true },
    resumePlace: { type: 'string', required: true }
};

const Controller = require('egg').Controller;

class ResumeController extends Controller {
  //创建简历
  async create() {
    const  { ctx } = this
    const pamers = ctx.request.body
    ctx.validate(createRule, pamers)
    const result = await ctx.service.pc.resume.create(pamers)
    if (result) {
        await ctx.returnSucc('success', 0, 200, true)
    }else {
        await ctx.returnSucc('error', 1, 200, '参数错误')
    }
  }

  /**
   * 查询简历列表
   */
  async query(){
    const  { ctx } = this
    const result = await ctx.service.pc.resume.query()
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    }else {
      await ctx.returnSucc('error', 1, 200, '系统异常')
    }
  }

  // 删除简历
  async del(){
    const  { ctx } = this
    const pamers = ctx.request.query
    const result = await ctx.service.pc.resume.del(pamers.resume_id)
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    }else {
      await ctx.returnSucc('删除失败', 1, 200, false)
    }
  }
}

module.exports = ResumeController;

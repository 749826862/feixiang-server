'use strict';

// 用户列表

const fs = require('fs')
const pump = require('pump')

const Controller = require('egg').Controller;

class UserListController extends Controller {
  // 查询
  async query() {
    let { ctx } = this
    let { username } = ctx.request.query
    let result = await ctx.service.pc.userList.query(username || '')
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    } else {
      await ctx.returnSucc('error', 1, 500, '参数错误')
    }
  }

  // 删除
  async del() {
    const { ctx } = this
    const { id } = ctx.request.body
    const result = await ctx.service.pc.userList.del(id)
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    } else {
      await ctx.returnSucc('删除失败', 1, 200, false)
    }
  }

  // 新增用户
  async createUser() {
    const createRule = {
      userimg: { type: 'string', required: true },
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      userage: { type: 'number', required: true },
      usersex: { type: 'string', required: true }
    };
    let { ctx } = this
    let parmrs = ctx.request.body
    ctx.validate(createRule, parmrs)
    let result = await ctx.service.pc.userList.createUser(parmrs)
    if (result) {
      await ctx.returnSucc('success', 0, 200, result)
    } else {
      await ctx.returnSucc('error', 1, 500, '参数错误')
    }
  }

  // 图片上传
  async upload() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.pc.userList.upload(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });

      if (Object.keys(files).length > 0) {
        await ctx.returnSucc('success', 0, 200, files)
      } else {
        await ctx.returnSucc('error', 0, 500, '图片上传失败')
      }
    }
  }

}

module.exports = UserListController;

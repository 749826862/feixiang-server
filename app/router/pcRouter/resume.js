/**
 * PC端，简历相关路由
 * 
 */

module.exports = app => {
    const { router, controller } = app
    router.post('/pc/resume/create',controller.pc.resume.create)
    router.get('/pc/resume/list',controller.pc.resume.query)
    router.get('/pc/resume/del',controller.pc.resume.del)
}
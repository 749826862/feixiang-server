/**
 * PC端，用户列表相关路由
 * 
 */

 module.exports = app => {
    const { router, controller } = app
    router.get('/pc/user/list',controller.pc.userList.query)
    router.post('/pc/user/del',controller.pc.userList.del)
    router.post('/pc/user/upload',controller.pc.userList.upload)
    router.post('/pc/user/create',controller.pc.userList.createUser)
}
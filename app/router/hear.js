/**
 * 听模块 相关路由
 * 
 */

module.exports = app => {
    const { router, controller } = app
    router.get('/app/music/musicList',controller.hear.getMuiscList)
    router.get('/app/music/newMusic',controller.hear.getNewMusic)
    router.get('/app/music/musicInfo',controller.hear.getInfoMusic)
    // router.get('/app/user/getToken',controller.login.getToken)

}
/**
 * 首页相关路由
 * 
 */

module.exports = app => {
    const { router, controller } = app
    router.get('/app/home/getMenu',controller.home.getMenu)
    // router.get('/app/user/getToken',controller.login.getToken)

}
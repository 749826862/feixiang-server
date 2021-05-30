
/**
 * 登录相关路由
 * 
 */

module.exports = app => {
    const { router, controller } = app
    router.get('/app/user/login',controller.login.login)
    router.get('/app/user/getToken',controller.login.getToken)

}
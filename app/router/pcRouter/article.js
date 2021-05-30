/**
 * PC端，文章相关路由
 * 
 */

 module.exports = app => {
    const { router, controller } = app
    router.get('/pc/article/list',controller.pc.article.query)
}
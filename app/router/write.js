/**
 * 写模块 相关路由  write
 * 
 */

module.exports = app => {
    const { router, controller } = app
    router.get('/app/write/articleList',controller.write.getarticleList)//获取新闻头条列表
    router.post('/app/write/createArticle',controller.write.createArticle)  //创建文章
    router.get('/app/write/queryArticle',controller.write.queryArticle)  //查询文章
}
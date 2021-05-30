module.exports = (options,app) => {
    return async function gzip(ctx, next) {
        // 1.排除不需要验证 token 的路由
        // if (options.allowed.indexOf(ctx.request.url) > -1) return await next(options);
        // console.log(ctx.request.url, 9888)
        // if (ctx.request.url.includes(options.allowed)) return await next(options);
        if (options.allowed.some(item => ctx.request.url.includes(item))) return await next(options);

        //2. 获取 header 头token        
        const { authorization = '' } = ctx.header;
        if (!authorization) return ctx.returnError('您没有权限访问该接口!', 0, 401);
        let token = authorization.replace('Bearer ', '')
        
        //3. 根据token解密，换取用户信息
        let user = {};
        
        try {
            user = app.jwt.verify(token, app.config.jwt.secret)
        } catch(err) {
            err.name === 'TokenExpiredError' ? ctx.returnError('token 已过期! 请重新获取令牌')
                : ctx.returnError('Token 令牌不合法!');
            return 
        }

       //4. 把 user 信息挂载到全局ctx上
       ctx.auth = user

       // 5. 继续执行
       await next(options);
    };
  };
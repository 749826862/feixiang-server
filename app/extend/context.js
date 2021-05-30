
/**
 * 
 * this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
 * 
 */

module.exports = {
    returnSucc(msg='成功', code=0, httpCode=200,data=null) {
        // throw new global.myErrors(msg, code, httpCode)
        // this.status = httpCode
        return this.body = {
            code: httpCode,
            message : msg,
            data: data
        }
    },

    returnError(msg='失败', code=1, httpCode=400) {
        // throw new global.myErrors(msg, code, httpCode)
        this.status = httpCode
        return this.body = {
            status: httpCode,
            message : msg
        }
    },
    formatJson(data){
        let obj = null
        if(data instanceof Object){
            obj = JSON.parse(JSON.stringify(data))
            return obj
        }else{
            return data
        }
    }
  };
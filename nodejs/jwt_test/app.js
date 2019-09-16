const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const app = new Koa()
const router = new Router()
router.get('/api',ctx=>{
    ctx.body = 'Welcome'
})
router.post('/api/login',ctx=>{
    //mock user ：should search mysql
    const user = {
        id :`1` ,
        userName :'shancw',
        passwd:'shancw@111'
    }
    //当client访问这个route，返回一个加密的token
    jwt.sign({user},'secretKey',(err,token)=>{
        ctx.body = {
            token
        }
    })
})
// Authorization : Barer <access_token>
router.post('/api/post',ctx=>{
    const barerHeader = ctx.request.header['autuorization']
    if(!barerHeader ){
        ctx.response.status = 400
     }
    else{
        //存在Authorization
        const barer = barerHeader.split(' ')
        //get token 
        const barerToken = barer[1]
        //验证token
        jwt.verify(barerToken,'secretKey',(err,authData)=>{
            if(err) ctx.response.status = 403
            ctx.body = {
                authData,
                msg:'Post created ...'
            }
        })
    }
})
const port = 4000

app.listen(port,()=>{
    console.log(`server start at ${port}`)
})


app.use(router.routes())
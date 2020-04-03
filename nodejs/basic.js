const Koa = require("koa");
const Router = require('koa-router')

const server = new Koa();
const router = new Router()

//路由
router.get('/uploadFile',ctx=>{
    ctx.body = "success connect"
})

const PORT = 9527;
//服务器开启本地端口
server.listen(PORT, () => {
	console.log("app start")
});

server.use(router.routes())
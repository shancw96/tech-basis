
const Koa = require("koa");
const cors = require("koa2-cors");
// const bodyParser = require("koa-bodyparser");
const KoaBody = require('koa-body')
const Router = require("koa-router");
const stdout = require("shancw-stdout");
const path = require('path')
const PORT = 8081;
const server = new Koa();
const router = new Router()
server.listen(PORT, () => {
    stdout.bgGreen(`server start at port:${PORT}`);
});

router.post('/upload',ctx=>{
    console.log(ctx.request.body)
    console.log(ctx.request.files)//获取chunk
    ctx.body = 'connect'
})

server
    .use(cors())
    .use(KoaBody({
        multipart:true, // 支持文件上传 
        formidable: {
            //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
            uploadDir: path.resolve(__dirname, '../data')
        },
    }))
    .use(router.allowedMethods())
    .use(router.routes())
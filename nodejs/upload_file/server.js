const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const stdout = require("shancw-stdout");
const bodyParser = require("koa-body");
const app = new Koa();
const router = new Router();

router.post("/uploadChunk", ctx => {
    stdout.bgGreen("handle upload file");
    console.log(ctx.request.body);
    ctx.body = "connect";
});

router.post("/mergeChunk", ctx => {
    stdout.bgGreen("handle upload file");
    console.log(ctx.request.body);
    ctx.body = "connect";
});

app.listen(4007, () => {
    console.log("file upload server start at localhost:4007");
});

app.use(cors())
    .use(
        bodyParser({
            multipart: true,
            formidable: {
                maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
            }
        })
    )
    .use(router.routes())
    .use(router.allowedMethods());

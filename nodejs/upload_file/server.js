const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.post("/uploadChunk", ctx => {
  ctx.body = "connect";
});

router.post("/mergeChunk", ctx => {
  ctx.body = "connect";
});

app.listen(4007, () => {
  console.log("file upload server start at localhost:4008");
});

app.use(router.routes()).use(router.allowedMethods());

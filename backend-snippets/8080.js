const Koa = require("koa");
const Router = require("koa-router")
const PORT = 8080;

const server = new Koa();
const router = new Router();

server.listen(PORT);

server.use(async ctx => {
  ctx.body = "mysql service";
});


server.use(router.routes());


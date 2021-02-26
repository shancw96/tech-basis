const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  console.log(ctx.request)
  ctx.body = 'blog'
})
app.listen(8081)
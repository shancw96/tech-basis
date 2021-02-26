const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  console.log(ctx.request)
  ctx.body = 'app'
})
app.listen(8082)
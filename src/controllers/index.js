var KoaRouter = require('koa-router')

const api = KoaRouter()

api.get('/', async (ctx, next) => {
  await ctx.render('home', {})
})

module.exports = api
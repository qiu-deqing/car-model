var KoaRouter = require('koa-router')
let { 
  carService
} = require('../services')

const api = KoaRouter()

api.get('/api/car/detail', async (ctx) => {

  try {
    if (!ctx.query.id) {
      throw new Error('汽车id不能为空')
    }
    var result = await carService.detail(ctx.query.id)

    ctx.body = {
      info: {
        ok: true,
      },
      data: {
        car: result
      }
    }
  } catch (e) {
    var message = e.message
    if (e.stack) {
      message += '. Stack:' + e.stack.toString();
    }

    ctx.body = {
      info: {
        ok: false,
        msg: message
      }
    }
  }
})

api.get('/api/car/list', async (ctx, next) => {
  try {
    var params = Object.assign({}, ctx.query)
    params.toPage = +params.toPage || 1
    params.perPageSize = +params.perPageSize || 10
    var result = await carService.list(params)

    ctx.body = {
      info: {
        ok: true,
      },
      data: result
    }
  } catch (e) {
    var message = e.message
    if (e.stack) {
      message += '. Stack:' + e.stack.toString();
    }

    ctx.body = {
      info: {
        ok: false,
        msg: message
      }
    }
  }
})

module.exports = api
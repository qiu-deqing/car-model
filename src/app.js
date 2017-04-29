var Koa = require('koa')
var bodyParser  = require('koa-bodyparser')
var cors = require('koa-cors')
var path = require('path')
var views = require('koa-views')
var serve = require('koa-static')
const Sequelize = require('sequelize')
const config = require('./config')
const carController = require('./controllers/car')
const indexController = require('./controllers/index')

require('./lib/helper')()


var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

const app = new Koa()

app.use(cors())

app.use(views(__dirname + '/views', {
  map: {
    html: 'nunjucks'
  }
}))
app.use(bodyParser())
  .use(indexController.routes())
  .use(carController.routes())

app.use(serve(__dirname + '/public/assets'))

module.exports =  app



const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const src = './src/app'

const app = require(src)
app.listen(port)
console.log(`server at: http://localhost:${port}`)

const express = require('express')
const app = express()
const morgan = require('morgan')

const port = process.env.PORT || 3000

const game = require('./routes/game')
const frontend = require('./routes/frontend')
app.use(morgan('dev'))
app.use('/game', game)
app.use('/', frontend)
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
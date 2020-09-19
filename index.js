const express = require('express')
const app = express()
const morgan = require('morgan')

const port = 3000 || process.env.PORT

const game = require('./routes/game')

app.use(morgan('dev'))
app.use('/game', game)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
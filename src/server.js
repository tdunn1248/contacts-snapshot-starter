const express = require('express')
const app = express()
const routes = require('./server/routes');
const {renderError} = require('./server/utils')
const middleware = require('./server/middleware')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use('/', middleware)
app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const routes = require('./server/routes');
const expressSession = require('express-session')
const {renderError, verifyCurrentSession} = require('./server/utils')

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/contacts/'),
                  path.join(__dirname, 'views/partials/'),
                  path.join(__dirname, 'views/users/')])

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.user = null
  next()
})

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 6000000
  }
}))

app.use('/contacts', verifyCurrentSession)
app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

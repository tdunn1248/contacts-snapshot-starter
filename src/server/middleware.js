const express = require('express')
const router = require('express').Router()
const bodyParser = require('body-parser')
const expressSession = require('express-session')

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: false }))

router.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.regular = null
  response.locals.admin = null
  next()
})

router.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 6000000
  }
}))


module.exports = router

const expressSession = require('express-session')
const router = require('express').Router()
const bodyParser = require('body-parser')
const express = require('express')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.static('public'))

router.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 6000000
  }
}))

router.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.regular = null
  response.locals.admin = null
  next()
})

module.exports = router

const expressSession = require('express-session')
const router = require('express').Router()
const bodyParser = require('body-parser')
const express = require('express')
const {confirmUserSession, assignSession, confirmAdminRole} = require('./middleware-helpers')

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
  response.locals.role = null
  next()
})

router.use('/contacts', confirmUserSession)
router.use('/contacts', assignSession)
router.use('/contacts', confirmAdminRole)

module.exports = router

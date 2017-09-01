const router = require('express').Router()
const contacts = require('./contacts')
const users = require('./users')
const contact = require('../../models/contacts')
const {confirmUserSessionSession, assignSession} = require('../utils')

router.use('/contacts', confirmUserSessionSession)
router.use('/contacts', assignSession)

router.get('/', (request, response) => {
  if(!request.session.username) {
    response.status(401).redirect('/users/login')
  } else {
    contact.retrieveAll()
    // toss the request.session.role to the view
    // .then((contacts) => {response.status(200).render('contacts/index', { contacts, role: grab(request.session.role) })})
    .then(contacts => {response.status(200).render('contacts/index', { contacts, regular: request.session.username })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts)
router.use('/users', users)

module.exports = router

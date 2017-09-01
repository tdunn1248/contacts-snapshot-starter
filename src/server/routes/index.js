const router = require('express').Router()
const contacts = require('./contacts')
const users = require('./users')
const contact = require('../../models/contacts')
const {obtainUserRole} = require('../utils')
const {contactErrorHandler} = require('../error-middleware')

router.get('/', (request, response, next) => {
  if(!request.session.username) {
    response.status(401).redirect('users/login')
  } else {
    contact.retrieveAll()
    .then(contacts => {response.status(200).render('contacts/index', { contacts, role: obtainUserRole(request) })})
    .catch(error => next(new Error('Failed to get all contacts')))
  }
})

router.use(contactErrorHandler)
router.use('/contacts', contacts)
router.use('/users', users)

module.exports = router

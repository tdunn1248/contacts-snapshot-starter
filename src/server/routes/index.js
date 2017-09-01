const router = require('express').Router()
const contacts = require('./contacts')
const users = require('./users')
const contact = require('../../models/contacts')
const {confirmUserSessionSession, assignSession, obtainUserRole, confirmAdminRole} = require('../utils')

router.use('/contacts', confirmUserSessionSession)
router.use('/contacts', assignSession)
router.use('/contacts', confirmAdminRole)

router.get('/', (request, response) => {
  if(!request.session.username) {
    response.status(401).redirect('users/login')
  } else {
    contact.retrieveAll()
    .then(contacts => {response.status(200).render('contacts/index', { contacts, role: obtainUserRole(request) })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts)
router.use('/users', users)

module.exports = router

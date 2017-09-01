const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const CONTACT = require('../../models/contacts');
const confirmUserSessionSession = require('../utils').confirmUserSessionSession

router.use('/contacts', confirmUserSessionSession)

router.get('/', (request, response) => {
  if(!request.session.username) {
    response.status(401).redirect('/users/login')
  } else {
    CONTACT.retrieveAll()
    // check user status
    .then((contacts) => {response.status(200).render('contacts/index', { contacts, regular: request.session.username })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', users); // /contacts/search

module.exports = router;

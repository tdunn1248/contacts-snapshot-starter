const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const DbContacts = require('../../models/db/contacts');
// const DbUsers = require('../../models/db/users')

router.get('/', (request, response) => {
  if(!request.session.name) {
    response.redirect('/users/login')
  } else {
    DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts, user: request.session.name })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', users); // /contacts/search

module.exports = router;

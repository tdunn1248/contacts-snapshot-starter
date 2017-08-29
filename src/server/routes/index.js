const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const DbContacts = require('../../db/contacts');
const DbUsers = require('../../db/users')

router.get('/', (request, response) => {
  if(!request.session.name) {
    response.redirect('/users/signUp')
  } else {
    DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', users); // /contacts/search

module.exports = router;

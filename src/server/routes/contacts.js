const contact = require('../../models/contacts')
const {renderError, assignSession} = require('../utils')
const {erroHandler} = require('../error-middleware')

const router = require('express').Router()

// router.use('/', assignSession)

// use error middleware at the bottom
// send error codes and/messages there

router.get('/new', (request, response) => {
  response.render('new')
})

router.post('/', (request, response, next) => {
  contact.add(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contact.retrieveOne(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact })
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/:contactId/delete', (request, response, next) => {
  const contactId = request.params.contactId
  contact.remove(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contact.searchFor(query)
    .then(function(contacts) {
      if (contacts) return response.render('index', { query, contacts })
      next()
    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router

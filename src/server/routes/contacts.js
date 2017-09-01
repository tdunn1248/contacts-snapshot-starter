const contacts = require('../../models/contacts')
const {contactErrorHandler} = require('../error-middleware')

const router = require('express').Router()

router.get('/new', (request, response) => {
  response.status(200).render('contacts/new')
})

router.post('/', (request, response, next) => {
  contacts.add(request.body)
    .then(contact => {if (contact) return response.redirect(`/contacts/${contact[0].id}`)})
    .catch(error => next(new Error('Failed to add contact')))
})

router.get('/:contactId', (request, response, next) => {
  const {contactId} = request.params
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.retrieveOne(contactId)
    .then(contact => {if (contact) return response.status(200).render('contacts/show', { contact })})
    .catch(error => next(new Error('Failed to lookup contact')))
})

router.get('/:contactId/delete', (request, response, next) => {
  contacts.remove(request.params.contactId)
    .then(contact => {if (contact) return response.redirect('/')})
    .catch(error => next(new Error('Failed to delete contact')))
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.searchFor(query)
    .then(contacts => {if (contacts) return response.status(200).render('index', { query, contacts })})
    .catch(error => next(new Error('Failed to lookup contact')))
})

router.use(contactErrorHandler)

module.exports = router

const dbContacts = require('./db/contacts')

const createContact = (contact) => {
  return dbContacts.create(contact)
}

const getContacts = () => {
  return dbContacts.readAll()
}

const getContact = (id) => {
  return dbContacts.readOne(id)
}

const deleteContact = (id) => {
  return dbContacts.deleteSingle(id)
}

const searchFor = (searchQuery) => {
  return dbContacts.searchByName(searchQuery)
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchFor
}

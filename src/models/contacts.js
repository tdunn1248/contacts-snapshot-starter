const dbContacts = require('./db/contacts')

const add = (contact) => {
  return dbContacts.create(contact)
}

const retrieveAll = () => {
  return dbContacts.readAll()
}

const retrieveOne = (id) => {
  return dbContacts.readOne(id)
}

const remove = (id) => {
  return dbContacts.deleteSingle(id)
}

const searchFor = (searchQuery) => {
  return dbContacts.searchByName(searchQuery)
}

module.exports = {
  add,
  retrieveAll,
  retrieveOne,
  remove,
  searchFor
}

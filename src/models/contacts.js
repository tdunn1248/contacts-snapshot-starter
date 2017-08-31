const DBCONTACTS = require('./db/contacts')

const add = (contact) => {
  return DBCONTACTS.create(contact)
}

const retrieveAll = () => {
  return DBCONTACTS.readAll()
}

const retrieveOne = (id) => {
  return DBCONTACTS.readOne(id)
}

const remove = (id) => {
  return DBCONTACTS.deleteSingle(id)
}

const searchFor = (searchQuery) => {
  return DBCONTACTS.searchByName(searchQuery)
}

module.exports = {
  add,
  retrieveAll,
  retrieveOne,
  remove,
  searchFor
}

module.exports = {  
  assignUserRole: function(email) {
    if (email.includes('.admin')) {
      return role = 'admin'
    } else {
      return role = 'regular'
    }
  }
}

const USER = require('../../models/users')

const router = require('express').Router()

router.get('/signUp', (request, response, next) => {
  response.status(200).render('signUp')
})

router.post('/signUp', (request, response) => {
  const {email, password, confirm_password} = request.body
  if (password !== confirm_password) {
    response.render('signUp', {error: 'Passwords do not match!'})
  } else {
    USER.signUp(email, password)
    .then(person => {
      request.session.name = person[0].email
      response.redirect('/')
    })
    .catch(error => {
      if (error.code === '23505') {
        response.render('signUp', {error: 'Email is already in use'})
      }
    })
  }
})

router.get('/login', (request, response, next) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  const {email, password} = request.body
  DbUsers.loginUser(email, password)
  .then(user => {
     if (!user) {
       response.render('login', {error: 'Incorrect Email or Password'})
     } else {
       response.session.name = user.name
       response.redirect('/')
     }
  })
  .catch(e => console.log('error from login ',e))
})

router.get('/signout', (request, response) => {
  request.session.name = null
  request.session.cookie.expires = new Date()
  response.redirect('/')
})

module.exports = router

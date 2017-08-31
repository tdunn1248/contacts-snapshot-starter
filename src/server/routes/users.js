const user = require('../../models/users')
const comparePasswords = require('../../models/bcrypt').comparePasswords
const router = require('express').Router()

router.get('/signUp', (request, response, next) => {
  response.status(200).render('signup')
})

router.post('/signup', (request, response) => {
  const {email, password, confirm_password} = request.body
  if (password !== confirm_password) {
    response.status(200).render('signup', {error: 'Passwords do not match!'})
  } else {
    user.signUp(email, password)
    .then(user => {
      request.session.username = user[0].email
      response.redirect('/')
    })
    .catch(error => {
      console.log('errored', error.stack);
      if (error.code === '23505') {
        response.status(200).render('signup', {error: 'Email is already in use'})
      }
    })
  }
})

router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  const {email, password} = request.body
  user.obtainUserPassword(email)
  .then(user => {
    comparePasswords(password, user[0].password)
    .then(validLogin => {
      if (!validLogin) {
        response.status(200).render('login', {error: 'Password is incorrect'})
      } else {
        request.session.username = user[0].email
        response.redirect('/')
      }
    })
  }).catch(e => console.log(e.stack))
})

router.get('/signout', (request, response) => {
  request.session.username = null
  request.session.cookie.expires = new Date()
  response.redirect('/')
})

module.exports = router

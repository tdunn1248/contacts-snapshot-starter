const {assignUserStatus, assignUserSession} = require('../middleware_helpers/utils')
const {userErrorHandler} = require('../middleware_helpers/error-middleware')
const user = require('../../models/users')
const router = require('express').Router()

router.route('/signup')
  .get((request, response) => {response.status(200).render('users/signup')})
  .post((request, response, next) => {
    const {email, password, confirm_password} = request.body
    if (password !== confirm_password) {next(error)}
      else {
      user.Signup(email, password)
            .then(user => {
              assignUserStatus(user, request)
              response.redirect('/')
      })
      .catch(error => next(error))
    }
  })

router.route('/login')
  .get((request, response) => {response.render('users/login')})
  .post((request, response, next) => {
    const {userName, password} = request.body
    user.ConfirmPassword(userName, password)
      .then(user => {if (!user.confirmed) {next(error)}
        else {
          assignUserSession(user, request)
          response.redirect('/')
      }
    })
    .catch(error => next(error))
  })

router.route('/signout')
  .get((request, response) => {
    request.session.username = null
    request.session.cookie.expires = new Date()
    response.redirect('/')
})

router.use(userErrorHandler)

module.exports = router

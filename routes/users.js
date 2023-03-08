const express = require('express')
const router = express.Router()

/* Controllers */
const userController = require('../controllers/users-controller')

/* Middlewares */
const checkAuth = require('../middlewares/check-auth')

router.post('/sign-up', userController.userSignUp)
router.post('/sign-in', userController.userSignIn)
router.get('/profile', checkAuth, userController.userProfile)

module.exports = router

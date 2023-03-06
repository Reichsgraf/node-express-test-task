const express = require('express');
const router = express.Router();

const userController = require('../controllers/users-controller')

/* GET users listing. */
router.post('/sign-up', userController.userSignUp);
router.post('/sign-in', userController.userSignIn)
router.get('/profile', userController.userProfile)

module.exports = router;

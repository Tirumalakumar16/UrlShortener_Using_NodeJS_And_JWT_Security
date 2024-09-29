const express = require('express')

const router = express.Router();

const userController = require('../controller/userController')


router.post('/',userController.handleUserSignUp)

router.post('/signIn',userController.handleUserSignIn)





module.exports = router;
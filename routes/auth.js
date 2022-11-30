const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

//ROUTE - for '/api' (ex. /api/accounts, /api/resgister.....)
router.get('/accounts', AuthController.listAccounts)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

//ISSUE NIYA UNG INPUTS DUN SA 'ENTERNEWPASSWORD' PAGE 
//NAPAPASA NIYA DUN SA 'changePassword1' function
router.post('/changePassword', AuthController.changePassword1)
router.post('/changePassword2', AuthController.changePassword2)


module.exports = router
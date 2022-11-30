const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

//ROUTE - for '/api' (ex. /api/accounts, /api/resgister.....)
router.get('/accounts', AuthController.listAccounts)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router
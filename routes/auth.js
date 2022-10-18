const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

//ROUTE - for '/api' (ex. /api/users, /api/resgister.....)
router.get('/users', AuthController.listUsers)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router
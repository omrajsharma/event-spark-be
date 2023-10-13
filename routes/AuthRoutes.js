const express = require('express')
const router = express.Router()
const {register, login, profileCheck, logoutUser} = require('../controllers/AuthController')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', profileCheck)
router.post('/logout', logoutUser)

module.exports = router;
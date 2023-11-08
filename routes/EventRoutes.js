const express = require('express')
const router = express.Router()
const {getHome, getEvent} = require('../controllers/EventController')

router.get('/home-page', getHome)
router.get('/:eventId', getEvent)

module.exports = router;
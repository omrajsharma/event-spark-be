const express = require('express')
const router = express.Router()
const {createEvent, getEvents, updateEvent} = require('../controllers/AdminController')

router.post('/event', createEvent)
router.get('/event', getEvents)
router.put('/event', updateEvent)

module.exports = router;
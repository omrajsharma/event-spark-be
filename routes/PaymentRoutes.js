const express = require('express')
const router = express.Router()
const {getOrder, postPaymentId} = require('../controllers/PaymentController')

router.get('/order', getOrder)
router.post('/capture/:paymentId', postPaymentId)

module.exports = router;
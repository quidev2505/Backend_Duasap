const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/get', orderController.getOrder);
router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);
router.get('/findOrder/:username', orderController.findOrder);


module.exports = router;
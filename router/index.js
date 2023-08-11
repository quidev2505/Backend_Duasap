const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/get', orderController.getOrder);
router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);
router.delete('/deleteAllOrder', orderController.deleteManyOrder);
router.get('/findOrder/:username', orderController.findOrder);
router.get('/exportOrder', orderController.exportOrder);


module.exports = router;
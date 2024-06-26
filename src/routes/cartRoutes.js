const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);
router.get('/:userId', cartController.viewCart);
router.put('/update', cartController.updateCartItem);
router.delete('/remove', cartController.removeCartItem);

module.exports = router;
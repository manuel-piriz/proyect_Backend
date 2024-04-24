const express = require('express');
const router = express.Router();

let carts = [];

router.post('/', (req, res) => {
    const newCartId = carts.length + 1;

    const newCart = {
        id: newCartId,
        products: []
    };

    carts.push(newCart);

    res.json(newCart);
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;

    const cart = carts.find(cart => cart.id === parseInt(cartId));

    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = carts.find(cart => cart.id === parseInt(cartId));

    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const existingProduct = cart.products.find(product => product.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.products.push({
            id: productId,
            quantity: 1
        });
    }

    res.json(cart);
});

module.exports = router;
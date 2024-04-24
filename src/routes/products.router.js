const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager');

const productManager = new ProductManager('./products.json');


router.get('/', (req, res) => {
    const { limit } = req.query;

    if (limit) {
        const products = productManager.getProducts().slice(0, parseInt(limit));
        res.json(products);
    } else {
        const products = productManager.getProducts();
        res.json(products);
    }
});


router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado'});
    }
});


router.post('/', (req, res) => {
    console.log(req.body);
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    const status = req.body.status || true;

    const result = productManager.addProduct(title, description, price,thumbnail, code, stock, category, status);

    res.json({ message: result });
});


router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;

    try {
        const result = productManager.updateProduct(productId, updatedFields);
        res.json({ message: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);

    try {
        const result = productManager.deleteProduct(productId);
        res.json({ message: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
const express = require('express');

const { createProduct, getProducts, getProductsByUser, deleteProduct } = require('../../controllers/v1/product.controllers');
const { isValidHostaname } = require('../../middlewares/security');

const productsRoutes = express.Router();

productsRoutes.post('/products', isValidHostaname, createProduct);
productsRoutes.get('/products', isValidHostaname, getProducts);
productsRoutes.get('/products/:userId', isValidHostaname, getProductsByUser);
productsRoutes.delete('/products/:productId', isValidHostaname, deleteProduct);

exports.productsRoutes = productsRoutes;
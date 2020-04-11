const express = require('express');

const { createProduct, getProducts, getProductsByUser, deleteProduct } = require('../../controllers/v1/product.controllers');

const productsRoutes = express.Router();

productsRoutes.post('/products', createProduct);
productsRoutes.get('/products', getProducts);
productsRoutes.get('/products/:userId', getProductsByUser);
productsRoutes.delete('/products/:productId', deleteProduct);

exports.productsRoutes = productsRoutes;
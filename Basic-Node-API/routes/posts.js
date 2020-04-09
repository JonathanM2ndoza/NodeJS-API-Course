const express = require('express');
const { getPosts } = require('../controllers/posts');

const routerPosts = express.Router();
routerPosts.get('/', getPosts);

exports.routerPosts = routerPosts;
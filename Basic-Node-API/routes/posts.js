const express = require('express');
const { getPosts, createPost } = require('../controllers/posts');

const routerPosts = express.Router();

routerPosts.get('/', getPosts);

routerPosts.post('/post', createPost);

exports.routerPosts = routerPosts;
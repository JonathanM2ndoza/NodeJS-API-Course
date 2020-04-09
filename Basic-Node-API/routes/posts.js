const express = require('express');
const { getPosts, createPost } = require('../controllers/posts');
const { createPostValidator } = require('../validator/index');

const postRoutes = express.Router();

// post routes
postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPostValidator, createPost);

exports.postRoutes = postRoutes;
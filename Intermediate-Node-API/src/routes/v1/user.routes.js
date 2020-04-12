const express = require('express');

const { createUser, updateUser, getUser, getUsers, deleteUser } = require('../../controllers/v1/user.controllers');

const usersRoutes = express.Router();

usersRoutes.post('/users', createUser);
usersRoutes.put('/users/:userId', updateUser);
usersRoutes.get('/users/:userId', getUser);
usersRoutes.get('/users', getUsers);
usersRoutes.delete('/users/:userId', deleteUser);

exports.usersRoutes = usersRoutes;
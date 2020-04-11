const express = require('express');

const { createUser, getUsers, updateUser, deleteUser } = require('../../controllers/v1/user.controllers');

const usersRoutes = express.Router();

usersRoutes.post('/users', createUser);
usersRoutes.get('/users', getUsers);
usersRoutes.put('/users', updateUser);
usersRoutes.delete('/users/:userId', deleteUser);

exports.usersRoutes = usersRoutes;
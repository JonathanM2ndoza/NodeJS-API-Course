const express = require('express');

const { createUser, updateUser, getUser, getUsers, deleteUser, login } = require('../../controllers/v1/user.controllers');
const { isAuth, isValidHostaname, isAdmin } = require('../../middlewares/security');

const usersRoutes = express.Router();

usersRoutes.post('/users', isValidHostaname, isAuth, createUser);
usersRoutes.put('/users/:userId', isAuth, updateUser);
usersRoutes.get('/users/:userId', isAuth, getUser);
usersRoutes.get('/users', isAuth, getUsers);
usersRoutes.delete('/users/:userId', isAuth, deleteUser);
usersRoutes.post('/login', login);

exports.usersRoutes = usersRoutes;
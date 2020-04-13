import express from 'express';

import {
  createUserC,
  updateUserC,
  getUserC,
  getUsersC,
  deleteUserC,
  login,
} from '../../controllers/v1/user.controllers';
import { isAuth, isValidHostaname, isAdmin } from '../../middlewares/security';

const usersRoutes = express.Router();

usersRoutes.post('/users', isValidHostaname, createUserC);
usersRoutes.put('/users/:userId', isAuth, isAdmin, updateUserC);
usersRoutes.get('/users/:userId', isAuth, getUserC);
usersRoutes.get('/users', isAuth, isAdmin, getUsersC);
usersRoutes.delete('/users/:userId', isAuth, isAdmin, deleteUserC);
usersRoutes.post('/login', login);

export { usersRoutes };

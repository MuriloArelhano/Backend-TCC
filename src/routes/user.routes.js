const { Router } = require('express');
// controllers
const UserController = require('../app/controllers/UserController');
const AccessController = require('../app/controllers/AccessController');
// middlewares
const authMiddleware = require('../app/middlewares/auth');

const userRouter = Router();

userRouter.post('/', UserController.create);
userRouter.post('/auth', UserController.auth);
userRouter.get('/', authMiddleware, UserController.listAll);
// access
userRouter.post('/:manage', authMiddleware, AccessController.manage);

module.exports = userRouter;

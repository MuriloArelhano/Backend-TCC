const { Router } = require('express');
// controllers
const UserController = require('../app/controllers/UserController');
const AccessController = require('../app/controllers/AccessController');

const userRouter = Router();

userRouter.get('/', (request, response) => {
  return response.send('Rota de usuários');
});

userRouter.post('/', UserController.create);
userRouter.post('/auth', UserController.auth);
// access
userRouter.post('/approve', AccessController.approveUser);
userRouter.post('/suspend', AccessController.suspendUser);

module.exports = userRouter;

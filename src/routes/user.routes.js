const { Router } = require('express');
const UserController = require('../app/controllers/UserController');

const userRouter = Router();

userRouter.get('/', (request, response) => {
  return response.send('Rota de usuários');
});

userRouter.post('/', UserController.create);
userRouter.post('/auth', UserController.auth);

module.exports = userRouter;

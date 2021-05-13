const { Router } = require('express');

const userRouter = Router();

userRouter.get('/', (request, response) => {
  return response.send('Rota de usuários');
});

module.exports = userRouter;

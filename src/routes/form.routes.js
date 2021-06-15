const { Router } = require('express');
// controllers
const FormController = require('../app/controllers/FormController');
// middlewares
const authMiddleware = require('../app/middlewares/auth');

const formRouter = Router();

formRouter.post('/', authMiddleware, FormController.create);
formRouter.get('/', authMiddleware, FormController.listAll);
formRouter.get('/answers', authMiddleware, FormController.getAnswersAmount);

module.exports = formRouter;

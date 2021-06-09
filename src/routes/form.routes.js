const { Router } = require('express');
// controllers
const FormController = require('../app/controllers/FormController');

const formRouter = Router();

formRouter.post('/', FormController.create);

module.exports = formRouter;

const { Router } = require('express');
// controllers
const StageController = require('../app/controllers/StageController');

const stageRouter = Router();

stageRouter.get('/', StageController.listAll);
stageRouter.post('/', StageController.create);
stageRouter.put('/:id', StageController.createContent);

module.exports = stageRouter;

const { Router } = require('express');
// controllers
const StageController = require('../app/controllers/StageController');

const stageRouter = Router();

stageRouter.get('/', StageController.listAll);
stageRouter.get('/:id/:focusArea', StageController.listFocusArea);
stageRouter.post('/', StageController.create);
stageRouter.put('/:id', StageController.createContent);

module.exports = stageRouter;

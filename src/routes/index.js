const { Router } = require('express');
const userRoutes = require('./user.routes');
const stageRoutes = require('./stage.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/stages', stageRoutes);

module.exports = routes;

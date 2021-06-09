const { Router } = require('express');
const userRoutes = require('./user.routes');
const stageRoutes = require('./stage.routes');
const formRoutes = require('./form.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/stages', stageRoutes);
routes.use('/forms', formRoutes);

module.exports = routes;

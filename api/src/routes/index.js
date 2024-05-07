const { Router } = require('express');
const menusRouter = require('./menusRouter');

const mainRouter = Router();

mainRouter.use('/menu', menusRouter);

module.exports = mainRouter;

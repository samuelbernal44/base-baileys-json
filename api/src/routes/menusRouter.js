const { Router } = require('express');
const {
  getAllMenusHandler,
  postMenuHandler,
  putMenuHandler,
  deleteMenuHandler,
} = require('../handlers/menusHandler');
const postMenuValidate = require('../middlewares/postMenuValidate');

const menusRouter = Router();

menusRouter.get('/', getAllMenusHandler);

menusRouter.post('/', postMenuValidate, postMenuHandler);

menusRouter.put('/:id', putMenuHandler);

menusRouter.delete('/:id', deleteMenuHandler);

module.exports = menusRouter;

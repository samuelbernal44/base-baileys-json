const Menu = require('../models/menuModel');

const getAllMenusHandler = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json({ menus });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while fetching the menu: ${err.message}`,
    });
  }
};

const postMenuHandler = async (req, res) => {
  const { tipo, platos } = req.body;

  try {
    const newMenu = new Menu({
      tipo,
      platos,
    });

    const savedMenu = await newMenu.save();

    res.json(savedMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while adding the menu: ${err.message}`,
    });
  }
};

const putMenuHandler = async (req, res) => {
  const { id } = req.params;
  const { tipo, platos } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { tipo, platos },
      { new: true },
    );

    if (updatedMenu) {
      res.json(updatedMenu);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while updating the menu: ${err.message}`,
    });
  }
};

const deleteMenuHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenu = await Menu.findByIdAndRemove(id);

    if (deletedMenu) {
      res.json({ message: 'Menu deleted successfully' });
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while deleting the menu: ${err.message}`,
    });
  }
};

module.exports = {
  getAllMenusHandler,
  postMenuHandler,
  putMenuHandler,
  deleteMenuHandler,
};

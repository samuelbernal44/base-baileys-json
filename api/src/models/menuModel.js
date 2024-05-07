const mongoose = require('mongoose');
const { Schema } = mongoose;

const platoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

const tipoComidaSchema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  platos: [platoSchema],
});

const Menu = mongoose.model('Menu', tipoComidaSchema);

module.exports = Menu;

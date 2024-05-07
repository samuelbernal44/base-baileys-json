require('dotenv').config();

const { MONGODB_URI } = process.env;

const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successful connection to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

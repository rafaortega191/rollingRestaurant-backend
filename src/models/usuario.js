const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  es_admin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;

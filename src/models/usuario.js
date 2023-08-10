const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 8,
  },
  nombre: {
    type: String,
    required: true,
    maxlength: 50,
  },
  es_admin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;

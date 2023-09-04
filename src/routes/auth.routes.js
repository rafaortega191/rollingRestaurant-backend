const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import "dotenv/config";

const __secret = process.env.API_SECRET;

router.post(
  "/registro",
  [
    body("email")
      .isEmail()
      .withMessage("El email o contraseña no es válido")
      .isLength({ max: 50 })
      .withMessage("El email o contraseña no es válido"),
    body("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("El email o contraseña no es válido"),
    body("nombre")
      .isLength({ max: 50 })
      .withMessage("El email o contraseña no es válido"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, nombre } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      const es_admin = false;
      const newUser = new User({ email, password, nombre, es_admin });

      await newUser.save();

      return res.status(201).json({
        message: "Usuario registrado exitosamente",
        nombre: newUser.nombre,
        es_admin: newUser.es_admin,
      });
    } catch (error) {
      
      return res.status(500).json({ message: "Error al registrar el usuario" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("El email o contraseña no es válido"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        const es_password_valido = await bcrypt.compare(
          password,
          user.password
        );

        if (es_password_valido) {
          const token = jwt.sign({ userId: user._id }, __secret, {
            expiresIn: "1h",
          });

          return res.status(200).json({
            message: "Inicio de sesión exitoso",
            nombre: user.nombre,
            es_admin: user.es_admin,
            token,
          });
        } else {
          return res.status(401).json({ error: "Credenciales inválidas" });
        }
      } else {
        return res.status(404).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
);

router.get("/users", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error al recuperar la lista de usuarios",
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "el usuario se elimino correctamente",
    });
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error no se pudo borrar el usuario",
    });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "el usuario fue actualizado correctamente",
    });
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error no se pudo editar el usuario",
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    
    const usuario = await User.findById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error al recuperar el usuario",
    });
  }
});
module.exports = router;

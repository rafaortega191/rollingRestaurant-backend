const express = require("express");
const router = express.Router();
const User = require("../models/usuario");
const jwt = require("jsonwebtoken");

router.post("/registro", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ userId: user._id }, "TODO_CAMBIAR_ESTE_SECRET", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;
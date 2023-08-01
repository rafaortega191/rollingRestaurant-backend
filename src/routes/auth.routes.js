const express = require("express");
const router = express.Router();
const User = require("../models/usuario");
const jwt = require("jsonwebtoken");

router.post("/registro", async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    console.log(email, password, nombre);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const es_admin = false;
    const newUser = new User({ email, password, nombre, es_admin });

    console.log(newUser);

    await newUser.save();

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      nombre: newUser.nombre,
      es_admin: newUser.es_admin,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar el usuario" });
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

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      nombre: user.nombre,
      es_admin: user.es_admin,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    res.status(404).json({
      mensaje: "error no se pudo editar el usuario",
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const usuario = await User.findById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "error al recuperar el usuario",
    });
  }
});
module.exports = router;

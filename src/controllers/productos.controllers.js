import { validationResult } from "express-validator";
import Producto from "../models/producto";

export const controladorPrueba = (req, res) => {
  res.send("esto es una prueba de la ruta GET");
};

export const crearProducto = async (req, res) => {
  try {
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    res.status(201).json({
      mensaje: "el producto fue creado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "error al intentar crear un producto",
    });
  }
};

export const obtenerListaProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(404).json({
      mensaje: "error al recuperar la lista de productos",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({
      mensaje: "error al recuperar el producto",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "el producto se elimino correctamente",
    });
  } catch (error) {
    res.status(404).json({
      mensaje: "error no se pudo borrar el producto",
    });
  }
};

export const editarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "el producto fue actualizado correctamente",
    });
  } catch (error) {
    res.status(404).json({
      mensaje: "error no se pudo editar el producto",
    });
  }
};

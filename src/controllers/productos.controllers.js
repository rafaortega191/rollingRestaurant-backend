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
    console.log(error);
    res.status(400).json({
      mensaje: "error al intentar crear un producto",
    });
  }
};

export const obtenerListaProductos = async (req, res) => {
  try {
    //buscar en la bd la collection de productos
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "error al recuperar la lista de productos",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    //buscar en la bd un documento mediante la id
    console.log(req.params.id);
    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "error al recuperar el producto",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    //buscar en la bd un documento mediante la id y borrarlo
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "el producto se elimino correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "error no se pudo borrar el producto",
    });
  }
};

export const editarProducto = async (req, res) => {
  try {
    //buscar en la bd un documento mediante la id y lo edita, se valida antes de confirmar
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "el producto fue actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "error no se pudo editar el producto",
    });
  }
};

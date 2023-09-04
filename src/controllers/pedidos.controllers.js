import { validationResult } from "express-validator";
import Pedido from "../models/pedido";

export const controladorPrueba = (req, res) => {
  res.send("esto es una prueba de la ruta GET");
};

export const crearPedido = async (req, res) => {
  try {
    const pedidoNuevo = new Pedido(req.body);
    await pedidoNuevo.save();
    res.status(201).json({
      mensaje: "el pedido fue creado correctamente",
    });
  } catch (error) {
    
    res.status(400).json({
      mensaje: "error al intentar crear un pedido",
    });
  }
};

export const obtenerListaPedidos = async (req, res) => {
  try {
    
    const Pedidos = await Pedido.find();
    res.status(200).json(Pedidos);
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error al recuperar la lista de Pedidos",
    });
  }
};

export const obtenerPedido = async (req, res) => {
  try {
    
    
    const pedido = await Pedido.findById(req.params.id);
    res.status(200).json(pedido);
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error al recuperar el pedido",
    });
  }
};

export const borrarPedido = async (req, res) => {
  try {
    
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "el pedido se elimino correctamente",
    });
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error no se pudo borrar el pedido",
    });
  }
};

export const editarPedido = async (req, res) => {
  try {
    
    await Pedido.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "el pedido fue actualizado correctamente",
    });
  } catch (error) {
    
    res.status(404).json({
      mensaje: "error no se pudo editar el pedido",
    });
  }
};

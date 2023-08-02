import { Router } from "express";
import {
  borrarProducto,
  controladorPrueba,
  crearProducto,
  editarProducto,
  obtenerListaProductos,
  obtenerProducto,
} from "../controllers/productos.controllers";
import { check } from "express-validator";
import validarProducto from "../helpers/validarProducto";
import authenticateToken from '../middleware/authMiddleware'; 

const router = Router();

router.get("/prueba", authenticateToken, controladorPrueba);
router
  .route("/productos")
  .post(validarProducto, crearProducto) 
  .get(obtenerListaProductos);

router
  .route("/productos/:id")
  .get(obtenerProducto) 
  .delete(borrarProducto)
  .put(validarProducto, editarProducto);

export default router;

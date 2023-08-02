import { Router } from "express";
import { check } from "express-validator";
import validarPedido from "../helpers/validarPedido";
import { borrarPedido, crearPedido, editarPedido, obtenerListaPedidos, obtenerPedido } from "../controllers/pedidos.controllers";

const router = Router();

router
  .route("/pedidos")
  .post(validarPedido, crearPedido)
  .get(obtenerListaPedidos);
router
  .route("/pedidos/:id")
  .get(obtenerPedido)
  .delete(borrarPedido)
  .put( validarPedido, editarPedido);

export default router;

// app.get('/prueba', (req, res )=>{
//     res.send('esto es una prueba de la ruta GET')
// })

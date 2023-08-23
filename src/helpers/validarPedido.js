import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validarPedido = [
  check("productos")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un producto en el pedido"),
  check("productos.*.nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
  check("productos.*.precio")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .isNumeric()
    .withMessage("El precio debe tener un valor numérico")
    .custom((value) => {
      if (value >= 1 && value <= 10000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 1 y 10000 pesos");
      }
    }),
  check("productos.*.imagen")
    .notEmpty()
    .withMessage("La URL de una imagen es obligatoria"),
  check("productos.*.categoria")
    .notEmpty()
    .withMessage("La categoría es un dato obligatorio")
    .isIn(["con carne", "vegetariano", "sin tacc", "vegano"])
    .withMessage("La categoría debe ser una opción válida"),
  check("productos.*.cantidad")
    .notEmpty()
    .withMessage("La cantidad del producto es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor o igual a 1"),
  check("precioTotal")
    .notEmpty()
    .withMessage("El precio total del producto es obligatorio"),
  check("usuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  check("fecha").notEmpty().withMessage("La fecha del pedido es obligatoria"),
  check("_id").notEmpty().withMessage("El _id del producto es obligatorio"),
  check("estado")
    .notEmpty()
    .withMessage("El estado del pedido es obligatorio")
    .isIn(["pendiente", "realizado"])
    .withMessage("El estado del pedido debe ser 'pendiente' o 'realizado'"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarPedido;

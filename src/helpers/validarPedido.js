import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validarPedido = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
  check("precio")
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
  check("imagen").notEmpty().withMessage("La URL de una imagen es obligatoria"),
  //.matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/)
  //.withMessage("La imagen debe terminar en (png, jpg, gif, svg)"),
  check("categoria")
    .notEmpty()
    .withMessage("La categoría es un dato obligatorio")
    .isIn(["con carne", "vegetariano", "sin tacc", "vegano"])
    .withMessage("La categoría debe ser una opción válida"),
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

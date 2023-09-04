import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validarProducto = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("el nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("el nombre del producto debe tener entre 2 y 100 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("el precio del producto es obligatorio")
    .isNumeric()
    .withMessage("el precio debe tener un valor numerico")
    .custom((value) => {
      if (value >= 1 && value <= 10000) {
        return true;
      } else {
        throw new Error("el precio debe estar entre 1 y 10000 pesos");
      }
    }),
  check("imagen").notEmpty().withMessage("la url de una imagen es obligatoria"),

  check("categoria")
    .notEmpty()
    .withMessage("la categoria es un dato obligatorio")
    .isIn(["con carne", "vegetariano", "sin tacc", "vegano"])
    .withMessage("la categoria debe ser una opcion valida"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];
export default validarProducto;

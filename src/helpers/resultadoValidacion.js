import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  //trabajar con los resultados validados
  const errors = validationResult(req);
  //errors.isEmpty(); true si esta vacio , false si tiene errores;
  //quiero saber si hay errores
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }
  //continuar con la ejecucion
  next();
};

export default resultadoValidacion

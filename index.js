//node --watch index.js para activar el que el archivo se vaya actualizando automaticamente
//si es la primera vez usa (npm install express --save)
//y usa (npm i babel-cli babel-preset-env express-validator mongoose cors morgan dotenv)
//instalar esto (npm install -g nodemon)
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";

import path from "path";
import "./src/database/dbconnections";
import productosRouter from "./src/routes/productos.routes";
const userRoutes = require("./src/routes/auth.routes");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const express = require("express");
import pedidorouter from "./src/routes/pedidos.routes";


dotenv.config();

const app = express();

app.set("PORT", process.env.PORT || 4000);

app.use(bodyParser.json());

//middlewares: funciones que se ejecutan antes de las rutas
app.use(express.json()); //permite interpretar el formato json en un request
app.use(express.urlencoded({ extended: true })); //permite interpretar string y arrays del request
app.use(cors()); //permite conexiones remotas
app.use(morgan("dev")); //me da info extra en la terminal
//cargar un archivo estatico
console.log(path.join(__dirname, "/public"));
app.use(express.static(path.join(__dirname, "/public")));

//rutas
//  http://localhost:4000/prueba
// app.get('/prueba', (req, res )=>{
//     res.send('Esta es una prueba de mi ruta GET')
// })

app.listen(app.get("PORT"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("PORT")}`);
});

app.use("/user", userRoutes);
app.use("/apirestaurante", productosRouter);
app.use("/apirestaurante", pedidorouter);

//app.use('/apicafe/auth',usuarioRouter)

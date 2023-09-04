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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "/public")));

app.listen(app.get("PORT"), () => {});

app.use("/user", userRoutes);
app.use("/apirestaurante", productosRouter);
app.use("/apirestaurante", pedidorouter);

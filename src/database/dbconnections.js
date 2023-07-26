import mongoose from "mongoose";
import 'dotenv/config';

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/rollingrestaurant-backend';

mongoose.connect(uri);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{
    console.log('BD conectado');
})
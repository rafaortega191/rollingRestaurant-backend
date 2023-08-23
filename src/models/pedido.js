import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  estado: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
  productos: [
    {
      nombreProducto: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      precio: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
      },
      imagen: {
        type: String,
        required: true,
      },
      descripcion: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 300,
      },
      categoria: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  usuario: {
    type: String,
    required: true,
  },
});

const Pedido = mongoose.model("pedido", pedidoSchema);

export default Pedido;

import mongoose, {Schema} from "mongoose";

const pedidoSchema = new Schema({
    nombreProducto:{
        type: String,
        required:true,
        minLength: 2,
        maxLength: 100
    },
    precio:{
        type: Number,
        required:true,
        min:1,
        max:10000
    },
    imagen:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true,
        minLength: 2,
        maxLength: 300
    },
    categoria:{
        type: String,
        required:true,
    },
    estado:{
        type: String,
        required:true

    },
    nombreUsuario:{
        type: String,
        required:true

    },
    fechaActual: {
        type: String,
        required: true,
        
    },
    _id: {
        type: String,
        required: true,
        
    },
    cantidad: {
        type: Number,
        required: true,
        
    },
    precioTotal: {
        type: Number,
        required: true,
        
    }
    
})

const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;
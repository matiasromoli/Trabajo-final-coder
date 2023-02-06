import { Schema, model } from "mongoose";

const ordenInterface = {
    items: {type: String, required:true},
    fecha: {type: String, required:true},
    estado: {type: String, required:true},
    email: {type: String, required:true}
};

export const modelOrden = Schema(ordenInterface);
const Orden = model("orden", modelOrden);
export default Orden;
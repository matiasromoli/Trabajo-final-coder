import { Schema, model } from "mongoose";

const productoInterface = {
  nombre: { type: String, required: true },
  descri: { type: String, required: true },
  timeday: { type: String, required: true },
  codigo: { type: String, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
  stock: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
};

export const modelProducto = Schema(productoInterface);
const Producto = model("producto", modelProducto);
export default Producto;

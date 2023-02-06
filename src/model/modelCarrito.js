import { Schema, model } from "mongoose";

const carritoInterface = {
  producto: { type: [], required: true },
  timeday: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
};
const modelCarrito = Schema(carritoInterface);

const Carrito = model("carritos", modelCarrito);
export default Carrito;

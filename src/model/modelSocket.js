import { Schema, model } from "mongoose";

const socketInterface = {
  email: { type: String, required: true },
  tipo: { type: String, required: true },
  fecha: { type: String, required: true },
  mensaje: { type: String, required: true },
};
const modelSocket = Schema(socketInterface);

const message = model("mensajes", modelSocket);
export default message;

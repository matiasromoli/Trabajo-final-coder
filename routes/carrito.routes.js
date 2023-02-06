import { controllersCarrito } from "../controllers/carrito.controllers.js";
const carrito = express.Router();
import express from "express";

carrito.get("/", controllersCarrito.getCarrito);
carrito.post("/", controllersCarrito.postCarrito);
carrito.delete("/:id", controllersCarrito.deleteCarrito);
carrito.get("/:id/productos", controllersCarrito.getMostrarCarrito);
carrito.post("/:id/productos", controllersCarrito.postAgregarCarrito);
carrito.delete(
  "/:id/productos/:idProd",
  controllersCarrito.deleteProductoCarrito
);

export default carrito;

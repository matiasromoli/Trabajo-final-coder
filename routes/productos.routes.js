import { controllersProducto } from "../controllers/producto.controllers.js";
import { auth } from "../utils/passport/passport.js";
const productos = express.Router();
import express from "express";

export function rutaProtegida(req, res, next) {
  let { user } = req.body;

  if (user !== process.env.ADM_USER) {
    res
      .status(403)
      .json({ msg: "No está autorizado para realizar dicha acción." });
  } else {
    next();
  }
}

productos.get("/", controllersProducto.getProducto);
productos.post("/", controllersProducto.postProducto);
productos.get("/:id", controllersProducto.getProductoId);
productos.put("/:id", rutaProtegida, controllersProducto.putProducto);
productos.get("/categoria/:cat", auth, controllersProducto.getCategoria);
productos.delete("/:id", rutaProtegida, controllersProducto.deleteProducto);
productos.get(
  "/images/:productoid",
  auth,
  controllersProducto.getImagesProducto
);

export default productos;

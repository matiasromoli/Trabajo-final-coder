import { carritoService } from "../services/carrito.service.js";
import { DTOCarrito } from "../src/dto/DTOService.js";
export const carritoApp = new carritoService();

export const controllersCarrito = {
  postCarrito: async (req, res) => {
    try {
      let { email, address } = req.body;
      
      const carrito = await carritoApp.crearCarrito(email, address);
      res.status(200).json(carrito);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteCarrito: async (req, res) => {
    try {
      const del = await carritoApp.eliminarCarrito(
        new DTOCarrito(req.params.id)
      );
      res.status(200).json(del);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  postAgregarCarrito: async (req, res) => {
    try {
      await carritoApp.agregarProducto(
        new DTOCarrito(req.params.id, req.body.id)
      );
      res.redirect("/profile");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getMostrarCarrito: async (req, res) => {
    try {
      const productoCarrito = await carritoApp.listarProductosCarrito(
        new DTOCarrito(req.params.id, "")
      );
      res.status(200).json(productoCarrito);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProductoCarrito: async (req, res) => {
    try {
      await carritoApp.eliminarProductoCarrito(
        new DTOCarrito(req.params.id, req.params.idProd)
      );
      res.status(200).json("Producto eliminado con exito");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getCarrito: async (req, res) => {
    const carrito = await carritoApp.listarCarrito();
    res.json(carrito);
  },
};

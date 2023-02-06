import { DaoFactoryCarrito } from "../src/classes/DAOFactoryCarrito.js";
import { Logger } from "../src/classes/mongo/mongo.error.js";
const carritoDao = DaoFactoryCarrito.get();
const logg = new Logger();

export class carritoService {
  async crearCarrito(email, address) {
    try {
      let productos = [];
      return await carritoDao.crearCarrito(productos, email, address);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listarCarrito() {
    try {
      return await carritoDao.listarCarrito();
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async eliminarCarrito(data) {
    try {
      let { id } = data;
      return await carritoDao.deleteCarrito(id);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listarProductosCarrito(data) {
    try {
      let { id } = data;
      return await carritoDao.mostrarProductoCarrito(id);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async agregarProducto(data) {
    try {
      let { id, ident } = data;
      const agregar = await carritoDao.agregarProductoCarrito(id, ident);

      return agregar;
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async eliminarProductoCarrito(data) {
    try {
      let { id, ident } = data;
      return await carritoDao.deleteProductoCarrito(id, ident);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
}

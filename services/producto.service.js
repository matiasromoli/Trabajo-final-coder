import { DaoFactoryProducto } from "../src/classes/DAOFactoryProducto.js";
import { Logger } from "../src/classes/mongo/mongo.error.js";
const productoDAO = DaoFactoryProducto.get();
const logg = new Logger();

export class productoService {
  async editarProducto(id, producto) {
    try {
      return await productoDAO.editarProducto(id, producto);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listarProductoData(categoria) {
    try {
      return await productoDAO.listarProductoData(categoria);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listarProducto() {
    try {
      return await productoDAO.listarProducto();
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async eliminarProducto(id) {
    try {
      return await productoDAO.eliminarProducto(id);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listarProductoId(id) {
    try {
      return await productoDAO.listarProductoIdent(id);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async agregarProducto(body) {
    try {
      return await productoDAO.agregarNuevoProducto(body);
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
}

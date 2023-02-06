import { DaoFactoryProducto } from "../src/classes/DAOFactoryProducto.js";
import { DaoFactoryCarrito } from "../src/classes/DAOFactoryCarrito.js";
import { MongoClient } from "../src/classes/mongo/mongo.client.js";
import { Logger } from "../src/classes/mongo/mongo.error.js";
import { user } from "../src/model/modelUsuario.js";
import orden from "../src/model/modelOrden.js";

const productoDAO = DaoFactoryProducto.get();
const carritoDAO = DaoFactoryCarrito.get();
const mongo = MongoClient.getInstance();
const logg = new Logger();

export class sessionService {
  async crearOrden(email, producto, cantidad) {
    try {
      await mongo.connected();
      const date = new Date();

      const data = await orden.create({
        items: producto + "x" + cantidad,
        fecha: date.toDateString(),
        estado: "Generada",
        email: email,
      });

      return data;
    } catch (error) {
      logg.error(error);
      return error;
    } finally {
      await mongo.disconnect();
    }
  }
  async listarProductoCarrito(id) {
    try {
      const listarCarrito = await carritoDAO.mostrarProductoCarrito(id);
      let carrito = [];

      for (var i = 0; i < listarCarrito.producto.length; i++) {
        carrito.push(listarCarrito.producto[i]);
      }
      return carrito;
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async usuario(datosUsuario) {
    try {
      await mongo.connected();

      const data = await user.findById(datosUsuario);
      return data;
    } catch (error) {
      logg.error(error);
      return error;
    } finally {
      await mongo.disconnect();
    }
  }
  async listarProducto() {
    try {
      const listarProducto = await productoDAO.listarProducto();
      return listarProducto;
    } catch (error) {
      logg.error(error);
      return error;
    }
  }
  async listar(userID) {
    try {
      await mongo.connected();

      const data = await user.findById(userID);
      const carritoUser = await carritoDAO.listarCarritoData(data.email);
      return carritoUser;
    } catch (error) {
      logg.error(error);
      return error;
    } finally {
      await mongo.disconnect();
    }
  }
}

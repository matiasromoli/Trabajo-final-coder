import { CarritoDaoArchivo } from "../daos/carrito/carritoDaoArchivo.js";
import { CarritoDaoMemoria } from "../daos/carrito/carritoDaoMemoria.js";
import CarritoDaoMongoDb from "../daos/carrito/carritoDaoMongo.js";
import { config } from "../../config/config.js";

export class DaoFactoryCarrito {
  static get() {
    switch (config.pers) {
      case "MEMORIA":
        return new CarritoDaoMemoria();
      case "ARCHIVO":
        return new CarritoDaoArchivo();
      case "MONGODB":
        return new CarritoDaoMongoDb();
      default:
        return new CarritoDaoMongoDb();
    }
  }
}

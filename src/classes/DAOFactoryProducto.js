import { ProductosDaoMemoria } from "../daos/producto/productoDaoMemoria.js";
import { ProductosDaoArchivo } from "../daos/producto/productoDaoArchivo.js";
import ProductosDaoMongoDb from "../daos/producto/productoDaoMongo.js";
import { config } from "../../config/config.js";

export class DaoFactoryProducto {
  static get() {
    switch (config.pers) {
      case "MEMORIA":
        return new ProductosDaoMemoria();
      case "ARCHIVO":
        return new ProductosDaoArchivo();
      case "MONGODB":
        return new ProductosDaoMongoDb();
      default:
        return new ProductosDaoMongoDb();
    }
  }
}

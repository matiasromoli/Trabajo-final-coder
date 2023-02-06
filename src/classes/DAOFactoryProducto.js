import { ProductosDaoMemoria } from "../daos/producto/ProductoDaoMemoria.js";
import { ProductosDaoArchivo } from "../daos/producto/ProductoDaoArchivo.js";
import ProductosDaoMongoDb from "../daos/producto/ProductoDaoMongo.js";
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

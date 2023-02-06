import { ProductoMongoDb } from "../../container/db/mongo.js";
import Producto from "../../model/modelProducto.js";

let instance = null;

class ProductosDaoMongoDb extends ProductoMongoDb {
  constructor() {
    super(Producto);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductosDaoMongoDb();
    }

    return instance;
  }
}
export default ProductosDaoMongoDb;

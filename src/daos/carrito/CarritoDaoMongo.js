import { CarritoMongoDb } from "../../container/db/mongo.js";
import Carrito from "../../model/modelCarrito.js";

let instance = null;

class CarritoDaoMongoDb extends CarritoMongoDb {
  constructor() {
    super(Carrito);
  }
  static getInstance() {
    if (!instance) {
      instance = new CarritoDaoMongoDb();
    }

    return instance;
  }
}

export default CarritoDaoMongoDb;

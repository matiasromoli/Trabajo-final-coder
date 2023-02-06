import { CarritoArchivo } from "../../container/archivo.js";
const __dirname = path.resolve();
import path from "path";

export class CarritoDaoArchivo extends CarritoArchivo {
  constructor() {
    super(path.join(__dirname, "/json/carrito.json"));
  }
}

import { ProductoArchivo } from "../../container/archivo.js";
const __dirname = path.resolve();
import path from "path";

export class ProductosDaoArchivo extends ProductoArchivo {
  constructor() {
    super(path.join(__dirname, "/json/producto.json"));
  }
}

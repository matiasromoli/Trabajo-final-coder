import { MemoriaCarrito } from "../../container/memoria.js";

export class CarritoDaoMemoria extends MemoriaCarrito {
  constructor() {
    let carrito = [];
    super(carrito);
  }
}


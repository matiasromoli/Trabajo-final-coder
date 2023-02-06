import { MemoriaProducto } from "../../container/memoria.js";
export let producto = [
  {  
    id: 1,
    nombre: "Bocadito helado Frigor dulce de leche chomp pote",
    descri: " 180 g.",
    codigo: "P001a2",
    precio: 819.00,
    foto: "https://carrefourar.vtexassets.com/arquivos/ids/217709-1200-auto?v=637699216084100000&width=1200&height=auto&aspect=true",
    stock: 10,
    cantidad: 1,
    categoria: "Helados y postres"
  },
  {  
    id:2,
    nombre: "Fideos tirabuzones Matarazzo 500 g.",
    descri: " 500 g.",
    codigo: "P001a2",
    precio: 198.00,
    foto: "https://carrefourar.vtexassets.com/arquivos/ids/175371-1200-auto?v=637468569750900000&width=1200&height=auto&aspect=true",
    stock: 10,
    cantidad: 1,
    categoria: "Helados y postres"
  },
];

export class ProductosDaoMemoria extends MemoriaProducto {
  constructor() {
    super(producto);
  }
}


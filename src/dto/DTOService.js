export class DTOProducto {
  nombre;
  descri;
  codigo;
  precio;
  stock;
  foto;
  cantidad;
  categoria;

  constructor(data) {
    this.nombre = data.nombre;
    this.descri = data.descri;
    this.codigo = data.codigo;
    this.precio = data.precio;
    this.stock = data.stock;
    this.foto = data.foto;
    this.cantidad = data.cantidad;
    this.categoria = data.categoria;
  }
}
export class DTOCarrito {
  id;
  ident;
  constructor(id, ident) {
    this.id = id;
    this.ident = ident;
  }
}

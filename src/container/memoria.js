import { producto } from "../daos/producto/ProductoDaoMemoria.js";

export class MemoriaProducto {
  constructor(producto) {
    this.producto = producto;
  }
  async listarProducto() {
    try {
      const listaDeProductos = await this.producto;
      return listaDeProductos;
    } catch (error) {
      return [];
    }
  }
  async listarProductoIdent(id) {
    try {
      const listaDeProductos = await this.producto;

      const productoID = listaDeProductos.find((p) => p.id === parseInt(id));
      const resultadoProducto = !productoID
        ? `No existe el producto solicitado con el ID ${id}`
        : productoID;

      return resultadoProducto;
    } catch (error) {
      return error;
    }
  }
  async agregarNuevoProducto(producto) {
    try {
      const listaDeProductos = await this.producto;
      const date = new Date();
      let productoID;

      listaDeProductos.length === 0
        ? (productoID = 1)
        : (productoID = listaDeProductos[listaDeProductos.length - 1].id + 1);

      listaDeProductos.push({
        id: productoID,
        ...producto,
        timeDay: date.toLocaleString(),
      });
      return "Producto guardado con éxito.";
    } catch (error) {
      return error;
    }
  }
  async editarProducto(ident, producto) {
    const listaDeProductos = await this.producto;

    const p = listaDeProductos.find((p) => p.id === parseInt(ident));
    const resultadoBusqueda = listaDeProductos.indexOf(p);

    if (resultadoBusqueda === -1) {
      return `No existe producto con el ID: ${ident}`;
    } else {
      p.nombre = producto.nombre;
      p.descri = producto.descri;
      p.codigo = producto.codigo;
      p.precio = producto.precio;
      p.image = producto.image;
      p.stock = producto.stock;
    }
    return "Producto modificado con éxito.";
  }
  async eliminarProducto(ident) {
    const listaProducto = await this.producto;

    const p = listaProducto.find((p) => p.id === parseInt(ident));
    const resultadoBusqueda = listaProducto.indexOf(p);

    if (resultadoBusqueda === -1) {
      return `No existe producto con el ID: ${ident}`;
    } else {
      listaProducto.splice(resultadoBusqueda, 1);
      return `El producto seleccionado fue borrado con exito.`;
    }
  }
}
export class MemoriaCarrito {
  constructor(carrito) {
    this.carrito = carrito;
  }
  async listarCarrito() {
    try {
      const listarCarrito = await this.carrito;
      return listarCarrito;
    } catch (error) {
      return [];
    }
  }
  async crearCarrito(productos) {
    try {
      const listaDeCarritos = await this.carrito;
      const today = new Date();
      let id;

      listaDeCarritos.length === 0
        ? (id = 1)
        : (id = listaDeCarritos[listaDeCarritos.length - 1].id + 1);

      listaDeCarritos.push({ productos, id, timeDay: today });
      return `Carrito creado. El número de ID es: ${id}`;
    } catch (error) {
      return error;
    }
  }
  async deleteCarrito(ident) {
    try {
      const listaDeCarritos = await this.carrito;

      const c = listaDeCarritos.find((c) => c.id === parseInt(ident));
      const resultadoBusqueda = listaDeCarritos.indexOf(c);

      if (resultadoBusqueda === -1) {
        return `No existe el carrito con el id: ${ident}`;
      } else {
        listaDeCarritos.splice(resultadoBusqueda, 1);
        return `El carrito seleccionado fue borrado con éxito.`;
      }
    } catch (error) {
      return error;
    }
  }

  async agregarProductoCarrito(ident, productoID) {
    try {
      const listaDeCarritos = await this.carrito;
      if (!listaDeCarritos[ident - 1]) return `El carrito: ${ident} no existe.`;

      const obtenerProducto = new MemoriaProducto(producto);
      const listaProductos = await obtenerProducto.listarProducto();

      const p = listaProductos.find((p) => p.id === parseInt(productoID));

      if (!p) {
        return `El producto no existe.`;
      } else {
        const carrito = listaDeCarritos[ident - 1].productos;
        carrito.push(p);

        listaDeCarritos[ident - 1] = { ...listaDeCarritos[ident - 1] };
        return `Producto agregado exitosamente al carrito ${ident}.`;
      }
    } catch (error) {
      return error;
    }
  }
  async mostrarProductoCarrito(ident) {
    try {
      const listaDeCarritos = await this.carrito;
      const carritoID = listaDeCarritos.find((c) => c.id === parseInt(ident));

      if (!carritoID) return `No existe el carrito con el id: ${ident}`;

      if (carritoID.productos.length === 0) {
        return "El carrito está vacío";
      } else {
        return carritoID.productos;
      }
    } catch (error) {
      return error;
    }
  }
  async deleteProductoCarrito(ident, productoID) {
    try {
      const listarCarrito = await this.carrito;
      if (!listarCarrito[ident - 1]) return "No existe el carrito";

      const c = listarCarrito[ident - 1].productos.find(
        (c) => c.id === parseInt(productoID)
      );
      const resultadoBusqueda = listarCarrito[ident - 1].productos.indexOf(c);
      if (resultadoBusqueda === -1) {
        return `No existe el producto con el id: ${productoID} en el carrito.`;
      } else {
        listarCarrito[ident - 1].productos.splice(resultadoBusqueda, 1);
        return `El producto seleccionado fue borrado del carrito con el id: ${ident}`;
      }
    } catch (error) {
      return error;
    }
  }
}

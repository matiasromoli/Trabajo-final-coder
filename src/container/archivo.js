import fs from "fs/promises";

export class ProductoArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listarProducto() {
    try {
      const listaProducto = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(listaProducto);
    } catch (error) {
      return [];
    }
  }
  async listarProductoid(id) {
    try {
      const listaProducto = await this.listarProducto();

      const productoParams = listaProducto.find((p) => p.id === parseInt(id));
      const resultadoProducto = !productoParams
        ? `No existe el producto solicitado con el ID ${id}`
        : productoParams;

      return resultadoProducto;
    } catch (error) {
      return error;
    }
  }
  async agregarNuevoProducto(producto) {
    try {
      const listaProducto = await this.listarProducto();
      const today = new Date();
      let productoID;

      listaProducto.length === 0
        ? (productoID = 1)
        : (productoID = listaProducto[listaProducto.length - 1].id + 1);

      listaProducto.push({
        id: productoID,
        ...producto,
        timeDay: today.toLocaleString(),
      });

      await fs.writeFile(this.ruta, JSON.stringify(listaProducto, null, 2));
      return "Producto guardado con éxito.";
    } catch (error) {
      return error;
    }
  }
  async editarProducto(id, producto) {
    try {
      const listaProducto = await this.listarProducto();

      const p = listaProducto.find((p) => p.id === parseInt(id));
      const resultadoBusqueda = listaProducto.indexOf(p);

      if (resultadoBusqueda === -1) {
        return `No existe producto con el ID: ${id}`;
      } else {
        p.nombre = producto.nombre;
        p.descri = producto.descri;
        p.codigo = producto.codigo;
        p.precio = producto.precio;
        p.image = producto.image;
        p.stock = producto.stock;

        await fs.writeFile(this.ruta, JSON.stringify(listaProducto, null, 2));
        return "Producto modificado con éxito.";
      }
    } catch (error) {
      return error;
    }
  }
  async eliminarProducto(id) {
    try {
      const listaProducto = await this.listarProducto();

      const p = listaProducto.find((p) => p.id === parseInt(id));
      const resultadoBusqueda = await listaProducto.indexOf(p);

      if (resultadoBusqueda === -1) {
        return `No existe producto con el ID: ${id}`;
      } else {
        listaProducto.splice(resultadoBusqueda, 1);
        await fs.writeFile(this.ruta, JSON.stringify(listaProducto, null, 2));
        return `El producto seleccionado fue borrado con exito.`;
      }
    } catch (error) {
      return error;
    }
  }
}
export class CarritoArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listarCarrito() {
    try {
      const listarCarrito = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(listarCarrito);
    } catch (error) {
      return [];
    }
  }
  async crearCarrito(productos) {
    try {
      const listaDeCarritos = await this.listarCarrito();
      const today = new Date();
      let id;

      listaDeCarritos.length === 0
        ? (id = 1)
        : (id = listaDeCarritos[listaDeCarritos.length - 1].id + 1);

      listaDeCarritos.push({ productos, id, timeDay: today });

      await fs.writeFile(this.ruta, JSON.stringify(listaDeCarritos, null, 2));
      return `Carrito creado. El número de ID es: ${id}`;
    } catch (error) {
      return error;
    }
  }
  async deleteCarrito(id) {
    try {
      const listaDeCarritos = await this.listarCarrito();

      const c = listaDeCarritos.find((c) => c.id === parseInt(id));
      const resultadoBusqueda = listaDeCarritos.indexOf(c);

      if (resultadoBusqueda === -1) {
        return `No existe el carrito con el id: ${id}`;
      } else {
        listaDeCarritos.splice(resultadoBusqueda, 1);
        await fs.writeFile(this.ruta, JSON.stringify(listaDeCarritos, null, 2));
        return `El carrito seleccionado fue borrado con éxito.`;
      }
    } catch (error) {
      return error;
    }
  }

  async agregarProductoCarrito(id, productoID) {
    try {
      const listaDeCarritos = await this.listarCarrito();
      if (!listaDeCarritos[id - 1]) return `El carrito: ${id} no existe.`;

      const obtenerProducto = new ProductoArchivo("./json/producto.json");
      const listaProductos = await obtenerProducto.listarProducto();

      const producto = await listaProductos.find(
        (p) => p.id === parseInt(productoID)
      );

      if (!producto) {
        return `El producto no existe.`;
      } else {
        const carrito = listaDeCarritos[id - 1].productos;
        carrito.push(producto);

        listaDeCarritos[id - 1] = { ...listaDeCarritos[id - 1] };
        await fs.writeFile(this.ruta, JSON.stringify(listaDeCarritos, null, 2));
      }
    } catch (error) {
      return error;
    }
  }
  async mostrarProductoCarrito(id) {
    try {
      const listaDeCarritos = await this.listarCarrito();
      const carritoID = listaDeCarritos.find((c) => c.id === parseInt(id));

      if (!carritoID) return `No existe el carrito con el id: ${id}`;

      if (carritoID.productos.length === 0) {
        return "El carrito está vacío";
      } else {
        return carritoID.productos;
      }
    } catch (error) {
      return error;
    }
  }
  async deleteProductoCarrito(id, productoID) {
    try {
      const listarCarrito = await this.listarCarrito();
      if (!listarCarrito[id - 1]) return "No existe el carrito";

      const carrito = listarCarrito[id - 1].productos.find(
        (c) => c.id === parseInt(productoID)
      );
      const resultadoBusqueda = listarCarrito[id - 1].productos.indexOf(carrito);
      if (resultadoBusqueda === -1) {
        return `No existe el producto con el id: ${productoID} en el carrito.`;
      } else {
        listarCarrito[id - 1].productos.splice(resultadoBusqueda, 1);
        await fs.writeFile(this.ruta, JSON.stringify(listarCarrito, null, 2));
        return `El producto seleccionado fue borrado del carrito con el id: ${id}`;
      }
    } catch (error) {
      return error;
    }
  }
}

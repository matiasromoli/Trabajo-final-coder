import { MongoClient } from "../../classes/mongo/mongo.client.js";
import Producto from "../../model/modelProducto.js";
import { Error } from "../../dto/DTO.class.js";
import mongoose from "mongoose";

export class ProductoMongoDb {
  constructor(model) {
    this.collection = model;
    this.connect = MongoClient.getInstance();
  }
  async listarProducto() {
    try {
      await this.connect.connected();
      const listarProducto = await this.collection.find();

      return listarProducto;
    } catch (error) {
      return [];
    } finally {
      await this.connect.disconnect();
    }
  }
  async listarProductoIdent(id) {
    try {
      await this.connect.connected();
      const listarProductoId = await this.collection.findById(id);

      return listarProductoId;
    } catch (error) {
      throw new Error(500, `No existe producto con el ID: ${id}`, error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async listarProductoData(categoria) {
    try {
      await this.connect.connected();
      const listarCantidad = await this.collection.find({
        categoria: categoria,
      });

      return listarCantidad;
    } catch (error) {
      throw new Error(500, "No se pudieron listar las categorias", error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async agregarNuevoProducto(producto) {
    try {
      await this.connect.connected();
      const date = new Date();

      await this.collection.create({
        ...producto,
        timeday: date.toLocaleString(),
      });

      return "El producto se ha agregado con exito";
    } catch (error) {
      throw new Error(
        500,
        "No se pudo agregar el producto a la base de datos.",
        error
      );
    } finally {
      await this.connect.disconnect();
    }
  }
  async editarProducto(id, producto) {
    try {
      await this.connect.connected();

      await this.collection.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            nombre: producto.nombre,
            descri: producto.descri,
            codigo: producto.codigo,
            precio: producto.precio,
            foto: producto.foto,
            stock: producto.stock,
          },
        }
      );

      return "El producto se ha modificado con exito.";
    } catch (error) {
      throw new Error(
        500,
        "No se pudo modificar el producto solicitado",
        error
      );
    } finally {
      await this.connect.disconnect();
    }
  }
  async eliminarProducto(id) {
    try {
      await this.connect.connected();
      await this.collection.findByIdAndDelete({
        _id: id,
      });

      return "El producto se ha eliminado con exito.";
    } catch (error) {
      throw new Error(500, "No se pudo eliminar el producto solicitado", error);
    } finally {
      await this.connect.disconnect();
    }
  }
}
export class CarritoMongoDb {
  constructor(model) {
    this.collection = model;
    this.connect = MongoClient.getInstance();
  }
  async listarCarrito() {
    try {
      await this.connect.connected();

      const carrito = await this.collection.find();
      return carrito;
    } catch (error) {
      return [];
    } finally {
      await this.connect.disconnect();
    }
  }
  async listarCarritoData(email) {
    try {
      await this.connect.connected();
      const carrito = await this.collection.find({ email });

      return carrito;
    } catch (error) {
      return [];
    } finally {
      await this.connect.disconnect();
    }
  }
  async crearCarrito(producto, email, address) {
    try {
      await this.connect.connected();
      const date = new Date();

      const crearCarrito = await this.collection.create({
        ...producto,
        timeday: date.toLocaleString(),
        address: address,
        email: email,
      });

      return crearCarrito;
    } catch (error) {
      throw new Error(500, "No se pudo crear el carrito.", error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async deleteCarrito(id) {
    try {
      await this.connect.connected();

      return await this.collection.findByIdAndDelete({
        _id: id,
      });
    } catch (error) {
      return new Error(500, "No se pudo eliminar el carrito", error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async agregarProductoCarrito(id, ident) {
    try {
      const product = new ProductoMongoDb(Producto);
      const p = await product.listarProductoIdent(ident);

      await this.connect.connected();

      const carrito = await this.collection.findById(
        { _id: id },
        { _id: 0, producto: 1 }
      );
      const data = carrito.producto.find((c) => c.nombre === p.nombre);
      const resultado = carrito.producto.indexOf(data);

      if (resultado < 0) {
        return await this.collection.findByIdAndUpdate(id, { 
          $push: { producto: p },
        });
      } else {
        await this.collection.findByIdAndUpdate(id, {
          $set: { "producto.0.cantidad": carrito.producto[resultado].cantidad + 1 },
        });
      }
      
    } catch (error) {
      throw new Error(500, "Hubo un error, vuelva a intentarlo.", error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async mostrarProductoCarrito(id) {
    try {
      await this.connect.connected();

      const carrito = await this.collection.findById(
        { _id: id },
        { _id: 0, producto: 1 }
      );

      return carrito;
    } catch (error) {
      throw new Error(500, "Hubo un error, vuelva a intentarlo.", error);
    } finally {
      await this.connect.disconnect();
    }
  }
  async deleteProductoCarrito(id, ident) {
    try {
      await this.connect.connected();
      return await this.collection.updateMany(
        { _id: id },
        {
          $pull: { producto: { _id: mongoose.Types.ObjectId(ident) } },
        }
      );
    } catch (error) {
      throw new Error(
        500,
        "No se pudo eliminar el producto del carrito.",
        error
      );
    } finally {
      await this.connect.disconnect();
    }
  }
}

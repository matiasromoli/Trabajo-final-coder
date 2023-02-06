import { productoService } from "../services/producto.service.js";
import { DTOProducto } from "../src/dto/DTOService.js";
const productoApp = new productoService();

export const controllersProducto = {
  getProducto: async (req, res) => {
    try {
      res.status(200).json(await productoApp.listarProducto());
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getProductoId: async (req, res) => {
    try {
      const listarProducto = await productoApp.listarProductoId(req.params.id);
      res.status(200).json(listarProducto);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getCategoria: async (req, res) => {
    try {
      const producto = await productoApp.listarProductoData(req.params.cat);
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getImagesProducto: async (req, res) => {
    try {
      const producto = await productoApp.listarProductoId(
        req.params.productoid
      );
      res.status(200).json(producto.foto);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  postProducto: async (req, res) => {
    try {
      const post = await productoApp.agregarProducto(new DTOProducto(req.body));
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  putProducto: async (req, res) => {
    try {
      const put = await productoApp.editarProducto(req.params.id, req.body);
      res.status(200).json(put);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProducto: async (req, res) => {
    try {
      const del = await productoApp.eliminarProducto(req.params.id);
      res.status(200).json(del);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

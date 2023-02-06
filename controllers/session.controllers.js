import { MongoClient } from "../src/classes/mongo/mongo.client.js";
import { sessionService } from "../services/sesion.service.js";
import { newBuyEmail } from "../utils/node/nodemailer.js";
import { verifyEmail } from "../utils/passport/index.js";

export const sessionApp = new sessionService();
import jwt from "jsonwebtoken";

const mongo = MongoClient.getInstance();
export let datosUsuario;

export const controllerSession = {
  viewIndex: (req, res) => {
    const message = req.flash("errorLogin");

    res.render("home", {
      title: "Iniciar sesión",
      message,
    });
  },
  viewRegister: (req, res) => {
    const message = req.flash("error");

    res.render("index", {
      title: "Registrarse",
      message,
    });
  },
  jwt: async (req, res) => {
    try {
      let { email, password } = req.body;
      await mongo.connected();

      const user = await verifyEmail(email);
      if (!user) return res.json({ msg: "no existe el usuario" });

      const validate = await user.isValidPassword(password);
      if (!validate) return res.json({ msg: "los datos son incorrectos" });

      const token = jwt.sign({ user }, "pass");
      return res.json({
        token,
      });
    } catch (error) {
      return error;
    } finally {
      await mongo.disconnect();
    }
  },
  profile: async (req, res) => {
    try {
      datosUsuario = req.session.passport.user;

      const carrito = await sessionApp.listar(datosUsuario);
      const data = await sessionApp.usuario(datosUsuario);
      const producto = await sessionApp.listarProducto();

      res.render("Profile/profile", {
        carritoID: carrito[0].id,
        user: data,
        producto,
        carrito,
      });
    } catch (error) {
      res.render("error/error.ejs", {
        error,
      });
    }
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  },
  carrito: async (req, res) => {
    try {
      const productoCarrito = await sessionApp.listarProductoCarrito(
        req.params.id
      );
      datosUsuario = req.session.passport.user;

      const carrito = await sessionApp.listar(datosUsuario);
      const data = await sessionApp.usuario(datosUsuario);

      res.render("models/carrito", {
        ident: req.params.id,
        productoCarrito,
        user: data,
        carrito,
      });
    } catch (error) {
      res.render("error/error.ejs", {
        error,
      });
    }
  },
  buy: async (req, res) => {
    try {
      datosUsuario = req.session.passport.user;
      const data = await sessionApp.usuario(datosUsuario);
      await sessionApp.crearOrden(data.email, req.body.nombre, req.body.cantidad);

      newBuyEmail(req.body);
      res.send("Compra realizada con exito");
    } catch (error) {
      res.render("./error/error.ejs", {
        error,
      });
    }
  },
};

import { SupportService } from "../services/support.service.js";
import { SocketService } from "../services/socket.service.js";
import { sessionApp } from "./session.controllers.js";
const supportApp = new SupportService();
const socketApp = new SocketService();
export let messageSupport;
export let messageUser;
export let user;

export const socketControllers = {
  index: async (req, res) => {
    try {
      const datos = req.session.passport.user;
      const data = await sessionApp.usuario(datos);
      const carrito = await sessionApp.listar(datos);
      messageUser = await socketApp.listarMessageUsuarioData(data.email);
      messageSupport = await supportApp.listarMessageUsuarioData(data.email);

      res.render("./chat/chat.ejs", {
        carritoID: carrito[0].id,
        title: "Consultas",
        user: data,
        carrito,
      });
    } catch (error) {
      res.render("./error/error.ejs", {
        error,
      });
    }
  },
  chat: async (req, res) => {
    try {
      const messageEmail = await socketApp.listarMessageUsuarioData(
        req.params.email
      );

      const datos = req.session.passport.user;
      const data = await sessionApp.usuario(datos);
      const carrito = await sessionApp.listar(datos);

      res.render("./chat/email.ejs", {
        messageEmail,
        user: data,
        carrito,
      });
    } catch (error) {
      res.render("./error/error.ejs", {
        error,
      });
    }
  },
  post: async (req, res) => {
    try {
      let { message } = req.body;
      const datosUsuario = req.session.passport.user;
      const data = await sessionApp.usuario(datosUsuario);

      user = {mensaje: message, email: data.email};
      res.redirect("/chat");
    } catch (error) {
      res.render("./error/error.ejs", {
        error,
      });
    }
  },
};

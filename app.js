import productos from "./routes/productos.routes.js";
import configServer from "./routes/config.routes.js";
import carrito from "./routes/carrito.routes.js";
import support from "./routes/support.routes.js";
import sesion from "./routes/sesion.routes.js";
import socket from "./routes/socket.routes.js";
import "./src/classes/DAOFactoryProducto.js";
import "./src/classes/DAOFactoryCarrito.js";
import { config } from "./config/config.js";
import { createServer } from "http";
import * as io from "socket.io";
import express from "express";
const app = express();


import { URL } from "./utils/index.js";
const __dirname = URL(import.meta.url);
import path from "path";

import cors from "cors";
app.use(cors());

import session from "express-session";
import "./utils/passport/passport.js";
import flash from "connect-flash";
import passport from "passport";

app.use(
  session({
    secret: config.passport.secret,
    cookie: { maxAge: 600000 },
    saveUninitialized: false,
    rolling: true,
    resave: true,
  })
);
app.use(flash());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import multer from "multer";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/image"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/image"),
  }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api/productos", productos);
app.use("/api/carrito", carrito);
app.use("/config", configServer);
app.use("/support", support);
app.use("/chat", socket);
app.use("/", sesion);

app.all("*", (req, res, err) => {
  res.render("error/404.ejs");
});

import { Logger } from "./src/classes/mongo/mongo.error.js";
const logg = new Logger();

const server = createServer(app);
server.listen(process.env.PORT, () => {
  logg.info(`Servidor levantado con éxito: ${process.env.PORT}`);
});

import {
  messageUser,
  messageSupport,
} from "./controllers/socket.controllers.js";

import { MongoClient } from "./src/classes/mongo/mongo.client.js";
import message from "./src/model/modelSocket.js";
const socketio = new io.Server(server);
const mongo = MongoClient.getInstance();

socketio.on("connection", (socket) => {
  (async () => {
    socketio.emit("server:message", messageUser);
  })();

  socket.on("cliente:mensaje", async (data) => {
    await mongo.connected();

    const msj = await message.create({
      email: data.email,
      tipo: "usuario",
      fecha: new Date().toLocaleString(),
      mensaje: data.mensaje,
    });
    const nuevoMensaje = await msj.save();
    socket.emit("server:nuevoMensaje", nuevoMensaje);
  });

  (async () => {
    socketio.emit("server:message", messageSupport);
  })();

  socket.on("cliente:support", async (data) => {
    await mongo.connected();

    const msj = await message.create({
      email: data.email,
      tipo: "sistema",
      fecha: new Date().toLocaleString(),
      mensaje: data.mensaje,
    });
    await msj.save();
  });
});

import { mostrarMensaje, nuevoMensaje } from "./socket.js";
const $ = (selector) => document.getElementById(selector);
const message = io();

message.on("server:message", (data) => {
  mostrarMensaje(data);
});
$("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = $("msg").value;
  const email = $("email").value;
  const data = { mensaje: msg, email: email };

  message.emit("cliente:mensaje", data);
});
message.on("server:nuevoMensaje", (data) => {
  nuevoMensaje(data);
});
message.on("server:message", (data) => {
  mostrarMensaje(data);
});

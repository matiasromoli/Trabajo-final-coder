const $ = (selector) => document.getElementById(selector);
const message = io();

$("formulario").addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = $("message").value;
  const email = $("email").value;
  const data = { mensaje: msg, email: email };

  message.emit("cliente:support", data);
});

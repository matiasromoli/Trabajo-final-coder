const $ = (selector) => document.getElementById(selector);
const content = $("contenido");

const mensajeDiv = (msj) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div> 
    <h2>  ${msj.email} </h2>
    <h2>  ${msj.mensaje} </h2>
    </div>
    `;

  return div;
};
const mensajeDivSupport = (msj) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div> 
    <h2>  Support: </h2>
    <h2>  ${msj.mensaje} </h2>
    </div>
    `;

  return div;
};
export const nuevoMensaje = (data) => {
  content.append(noteUI(data));
};
export const mostrarMensaje = (data) => {
  data.forEach((msj) => {
    if (msj.tipo === "usuario") {
      content.append(mensajeDiv(msj));
    } else {
      content.append(mensajeDivSupport(msj));
    }
  });
};

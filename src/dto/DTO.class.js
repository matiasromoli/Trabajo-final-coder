export class Error {
  constructor(status, descripcion, detalle) {
    this.status = status;
    this.descripcion = descripcion;
    this.detalle = detalle;
  }
}
export class Usuario {
  constructor(name,password, email, address, phone, image) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.image = image;
  }
}

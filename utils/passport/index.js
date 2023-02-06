import { MongoClient } from "../../src/classes/mongo/mongo.client.js";
import { user } from "../../src/model/modelUsuario.js";
import { Usuario } from "../../src/dto/DTO.class.js";
const mongo = MongoClient.getInstance();
import jwt from "jsonwebtoken";


export function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(201).json("No puede ingresar");

    const payload = jwt.verify(token, "pass");
    console.log(payload);
    next();
  } catch (error) {
    return error;
  }
}
export async function verifyEmail(email) {
  try {
    await mongo.connected();

    const data = await user.findOne({ email });
    return data;
  } catch (error) {
    return error;
  } finally {
    await mongo.disconnect();
  }
}
export async function deserialize(id) {
  try {
    await mongo.connected();

    const usuario = await user.findById(id);
    return usuario;
  } catch (error) {
    return error;
  }
}
export async function createUser(
  name,
  pass,
  password,
  email,
  address,
  phone,
  image
) {
  try {
    await mongo.connected();

    const usuario = new Usuario(
      name,
      pass,
      password,
      email,
      address,
      phone,
      image
    );
    const db = await user.create(usuario);
    return db;
  } catch (error) {
    return error;
  }
}



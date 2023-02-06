import { logger } from "../../../config/logger.js";
import { Error } from "../../dto/DTO.class.js";

export class MongoError {
  async conn() {
    return new Error(500, "No se pudo conectar a la base de datos");
  }
  async disc() {
    return new Error(500, "No se pudo desconectar la base de datos");
  }
}
export class Logger {
  info(data) {
    return logger.info(data);
  }
  error(data) {
    return logger.error(data);
  }
}

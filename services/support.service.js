import { MongoClient } from "../src/classes/mongo/mongo.client.js";
import message from "../src/model/modelSocket.js";
const mongo = MongoClient.getInstance();

export class SupportService {
  async listarMessageUsuarioData(email) {
    try {
      await mongo.connected();

      return await message.find({ email, tipo: "sistema" });
    } catch (error) {
      return error;
    } finally {
      await mongo.disconnect();
    }
  }
  async listarAll() {
    try {
      await mongo.connected();
      return await message.find({ tipo: "usuario" });
    } catch (error) {
      return error;
    } finally {
      await mongo.disconnect();
    }
  }
}

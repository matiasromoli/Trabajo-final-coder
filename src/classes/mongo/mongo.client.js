import { config } from "../../../config/config.js";
import { MongoError } from "./mongo.error.js";
import { Logger } from "./mongo.error.js";
import mongoose from "mongoose";

const logg = new Logger();
let instance = null;

export class MongoClient extends MongoError {
  constructor() {
    super();
    this.client = mongoose;
  }
  async connected() {
    try {
      await this.client.connect(config.mongodb.uri, config.mongodb.options);
    } catch (error) {
      const err = this.conn()
      logg.error(err);
      return err
    }
  }
  async disconnect() {
    try {
      await this.client.connection.close();
    } catch (error) {
      const err = this.disc();
      logg.error(err);
      return err;
    }
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoClient();
    }

    return instance;
  }
}

import { configControllers } from "../controllers/config.controllers.js";
import { auth } from "../utils/passport/passport.js";
const config = express.Router();
import express from "express";

config.get("/", auth, configControllers.config);

export default config;

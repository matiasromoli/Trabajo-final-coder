import { socketControllers } from "../controllers/socket.controllers.js";
import { auth } from "../utils/passport/passport.js";
const socket = express.Router();
import express from "express";

socket.get("/", auth, socketControllers.index);
socket.post("/", auth, socketControllers.post);
socket.get("/:email", auth, socketControllers.chat);

export default socket;

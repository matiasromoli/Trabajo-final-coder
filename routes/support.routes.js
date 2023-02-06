import express from "express";
const support = express.Router();

import { supportControllers } from "../controllers/support.controllers.js";
import { auth } from "../utils/passport/passport.js";

support.get("/", auth, supportControllers.index);
support.post("/", supportControllers.post);

export default support;

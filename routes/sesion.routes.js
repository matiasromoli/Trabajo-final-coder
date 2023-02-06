const sesion = express.Router();
import passport from "passport";
import express from "express";

import { controllerSession } from "../controllers/session.controllers.js";
import { verifyToken } from "../utils/passport/index.js";
import { auth } from "../utils/passport/passport.js";


sesion.get("/", controllerSession.viewIndex);
sesion.get("/register", controllerSession.viewRegister);
sesion.get("/profile", auth , controllerSession.profile);

sesion.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/register",
    passReqToCallback: true,
  })
);
sesion.post(
   "/login",
   passport.authenticate("signin", {
     successRedirect: "/profile",
     failureRedirect: "/",
   })
 );

//JWT
// sesion.post("/login", controllerSession.jwt);

sesion.get("/logout", controllerSession.logout);
sesion.get("/carrito/:id", auth, controllerSession.carrito);
sesion.post("/carrito/:id/buy", auth, controllerSession.buy);

export default sesion;

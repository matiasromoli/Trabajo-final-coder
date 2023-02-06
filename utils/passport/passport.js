import * as passLocal from "passport-local";
import passport from "passport";

import { carritoApp } from "../../controllers/carrito.controllers.js";
import { verifyEmail, createUser, deserialize } from "./index.js";
import { newUserEmail } from "../node/nodemailer.js";
import jwt from "jsonwebtoken";

passport.use(
  "signup",
  new passLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let { pass, nombre, address, phone } = req.body;

        const correo = await verifyEmail(email);
        if (correo)
          return done(
            null,
            false,
            req.flash("error", "Error: El correo esta en uso.")
          );

        if (password !== pass)
          return done(
            null,
            false,
            req.flash("error", "Error: Las contraseñas no coinciden.")
          );

        const usuario = await createUser(
          nombre,
          password,
          email,
          address,
          phone,
          req.file.filename
        );
        await carritoApp.crearCarrito(email, address);
        newUserEmail(usuario);
        return done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "signin",
  new passLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const usuario = await verifyEmail(email);
        if (!usuario)
          return done(
            null,
            false,
            req.flash(
              "errorLogin",
              "Error: El email no se encuentra registrado."
            )
          );

        const validate = await usuario.isValidPassword(password);
        if (!validate) {
          return done(
            null,
            false,
            req.flash(
              "errorLogin",
              "Error: Por favor, verifique su email y/o contraseña."
            )
          );
        }
        return done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const data = await deserialize(id);
  done(null, data);
});

export function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

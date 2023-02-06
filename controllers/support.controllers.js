import { SupportService } from "../services/support.service.js";
const supportApp = new SupportService();

export const supportControllers = {
  index: async (req, res) => {
    const data = await supportApp.listarAll();
    res.render("./chat/support.ejs", {
      title: "Support",
      data,
    });
  },
  post: async (req, res) => {
    try {
      let { email, mensaje } = req.body;
      await supportApp.guardarMessageUsuario(email, mensaje);

      res.redirect(200, "/");
    } catch (error) {
      res.render("./error/error.ejs", {
        error,
      });
    }
  },
};

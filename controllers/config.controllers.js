import { ConfigService } from "../services/config.service.js";

export const configControllers = {
  config: (req, res) => {
    const service = new ConfigService();
    const data = service.dtv();

    res.render("./config/config.ejs", {
      data,
    });
  },
};

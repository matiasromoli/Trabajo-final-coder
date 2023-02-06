import { config } from "./config.js";
import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    errorFile: { type: "file", filename: "./config/log/error.log" },

    loggerConsole: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsole"],
      level: "all",
    },
    production: {
      appenders: ["loggerError", "loggerConsole"],
      level: "all",
    },
  },
});

let logger = null;

if (config.env === "production") {
  logger = log4js.getLogger("production");
} else {
  logger = log4js.getLogger();
}

export { logger };

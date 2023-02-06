import pvk from "dotenv";
export const dotenv = pvk.config();

export const config = {
  mongodb: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  passport: {
    secret: process.env.SECRET_PASSPORT,
  },
  env: process.env.LOGGER,
  pers: process.env.PERS,
};

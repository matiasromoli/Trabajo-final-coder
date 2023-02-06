import { dotenv } from "../config/config.js";

export class ConfigService {
  dtv() {
    let data = Object.keys(dotenv.parsed);
    for (let i = 0; i < data.length; i++) {
      let dtv = data[i];
      dotenv.parsed[dtv];
    }
    return data;
  }
}

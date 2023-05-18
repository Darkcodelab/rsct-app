require("dotenv").config({ path: __dirname + "/.env" });
const { cleanEnv, num, url, str } = require("envalid");

const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  MONGO_URI: url(),
  JWT_SECRET_KEY: str(),
  ADMIN_TOKEN: str(),
  WASSENGER_TOKEN: str()
});

module.exports = env;

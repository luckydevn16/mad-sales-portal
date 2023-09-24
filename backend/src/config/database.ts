import vars from "./vars";

const config: any = {
  username: vars.database.username,
  password: vars.database.password,
  database: vars.database.database,
  host: vars.database.host,
  port: Number(vars.database.port) || 3000,
  dialect: "postgres",
};

module.exports = config;
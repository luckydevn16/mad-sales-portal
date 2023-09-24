import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";
import errorHandler from "./middlewares/error.middleware";
import vars from "./config/vars";
import "./utils/global";

const app: Express = express();

app.use(
  cors({
    origin: vars.client.url,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(vars.cookie.secret));

// connect routes
app.use(router);

app.use(errorHandler);

// set port, listen for requests
const { port } = vars;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;

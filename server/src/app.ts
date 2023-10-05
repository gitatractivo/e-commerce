import dotenv from "dotenv"
dotenv.config();
import express from "express";
import config from "config";
import cors from "cors";
import log from "./utils/logger";
import helmet from "helmet";
import router from "./routes";
import prisma from "./utils/prisma";
import cookieParser from "cookie-parser"
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");




const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);



app.use(deserializeUser);


console.log(config.get("smtp"))

// routes(app);
app.use(router)

app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
});

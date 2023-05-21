import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser()); //read cookie
app.use(
  cors({
    origin: true,
    credentials: true,
  })
); //to connect frontend port
app.use(bodyParser.json({ extended: true }));//convert req body to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running successfully on port:${PORT}`);
});

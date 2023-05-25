import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import router from "./routes/route.js";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json({ limit: '10mb' }));//convert req body to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running successfully on port:${PORT}`);
});

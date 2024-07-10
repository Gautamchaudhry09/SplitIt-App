import express from "express";
import { Connection } from "./database/Db.js";
import router from "./routes/Router.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

app.listen(PORT, () => {
  console.log(`server is running successfully on port ${PORT}`);
});
Connection();

app.use("/", router);

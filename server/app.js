require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Server!!!");
});

export default app;

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
//const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

// mongoose.connect("mongodb://localhost/wallet", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("error", (err: any) => console.error(err));
// db.once("once", () => console.log("Connected to DB"));

app.listen(port, () => console.log(`Server listening on port: ${port}`));

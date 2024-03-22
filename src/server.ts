import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const dbRepository = require("./repository/db.repository");
dotenv.config();

const app: Express = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

//Enable json posting and url encoded parameters
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

//Intitate DB connection
mongoose.Promise = Promise;
mongoose.connect(dbRepository.url);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.listen(port, () => console.log(`Server listening on port: ${port}`));

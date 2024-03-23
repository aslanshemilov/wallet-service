import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { validateRateLimit } from "./middleware/rateLimit.middleware";
import { idempotencySafe } from "./middleware/idempotencySafe.middleware";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.middleware";

dotenv.config();

const dbRepository = require("./repository/db.repository");
const app: Express = express();

//Enable json posting and url encoded parameters
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

const walletRouter = require("./routes/wallet.route");
const masterAccountRouter = require("./routes/masterAccount.route");
const walletAccountRouter = require("./routes/account.route");

const port = process.env.PORT || 3000;

//Intitate DB connection
console.log("Connecting to DB");
console.log(dbRepository.url);
mongoose
  .connect(dbRepository.url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: Error) => console.log("MongoDB connection error:", error));

//Invoke all routes with middleware validations
/**
 * @Notes
 * Here note im implementing a middleware pattern to validate the wallet requests
 * Note that the middleware will be executed in order
 */
app.use("/wallet", validateRateLimit, idempotencySafe, walletRouter);

//Other BackOffice Related invokations
app.use("/master", masterAccountRouter);
app.use("/account", walletAccountRouter);

//Inject Logging and Error handlers Middlewares
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

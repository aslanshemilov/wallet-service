import express, { Router } from "express";
import { computeBalanceEndOfDayHandler } from "../controllers/eod.controller";

const router: Router = express.Router();

//Calling the controller
router.route("/endOfDay").get(computeBalanceEndOfDayHandler);

module.exports = router;

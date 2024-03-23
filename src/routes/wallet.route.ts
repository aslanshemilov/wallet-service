import express, { Router } from "express";
import {
  depositRequestHandler,
  withdrawRequestHandler,
} from "../controllers/wallet.controller";

const router: Router = express.Router();

//Calling the controller
router.route("/withdraw/").post(withdrawRequestHandler);

//Calling the controller
router.route("/deposit/").post(depositRequestHandler);

module.exports = router;

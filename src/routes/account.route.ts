import {
  createAccountHandler,
  deleteAccountByAccountNumberHandler,
  getAccountByAccountNumberHandler,
  getAccountsHandler,
  updateAccountByAccountNumberHandler,
} from "../controllers/accounts.controller";
import express, { Router } from "express";
const router: Router = express.Router();

/**
 * @Notes
 * This is probably some backoffice route where they perform some basic crud functions to manage client accounts.
 **/

//Calling the controller
router.route("/").get(getAccountsHandler).post(createAccountHandler);

//Chaining requests by accountNumber
router
  .route("/:accountNumber")
  .get(getAccountByAccountNumberHandler)
  .put(updateAccountByAccountNumberHandler)
  .delete(deleteAccountByAccountNumberHandler);

module.exports = router;

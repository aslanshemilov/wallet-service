import express, { Router } from "express";
import {
  createMasterAccountHandler,
  deleteMasterAccountByReferenceHandler,
  getMasterAccountByReferenceHandler,
  getMasterAccountsHandler,
  updateMasterAccountByReferenceHandler,
} from "../controllers/masterAccounts.controller";

const router: Router = express.Router();

/**
 * @Notes
 * This is probably some backoffice route where they perform some basic crud functions to manage client master accounts.
 **/

//Calling the controller
router
  .route("/")
  .get(getMasterAccountsHandler)
  .post(createMasterAccountHandler);

//Chaining requests by reference
router
  .route("/:reference")
  .get(getMasterAccountByReferenceHandler)
  .put(updateMasterAccountByReferenceHandler)
  .delete(deleteMasterAccountByReferenceHandler);

module.exports = router;

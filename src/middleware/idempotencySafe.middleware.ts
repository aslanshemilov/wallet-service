import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";

//Demonstrating a middleware concept where you could make validations for the ideopotency
export const idempotencySafe = (
  req: Request<AccountTransactionInput>,
  res: Response,
  next: NextFunction
) => {
  console.log("Account Reference:" + req.body.reference);
  const uniqueReference = req.body.reference;
  /** TODO Check if the request has the same parameters as the already save requests if so return the same results or reject depending on the business requirement here **/
  next();
};

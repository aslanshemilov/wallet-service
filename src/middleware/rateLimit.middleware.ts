import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";

//Demonstrating a middleware concept where you could make validations for the rate limiting
export const validateRateLimit = (
  req: Request<AccountTransactionInput>,
  res: Response,
  next: NextFunction
) => {
  console.log("Account Reference:" + req.body.reference);
  const uniqueReference = req.body.reference;
  /** TODO Check database to see if this request is with the stipulated time i.e 1 min **/
  next();
};

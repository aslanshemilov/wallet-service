import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";

//Demonstrating a middleware concept where you could make validations for the rate limiting
export const validateRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** TODO Check repository to see if this request of the same type and amount is with the stipulated time i.e 1 min **/
  const transaction = req.body as AccountTransactionInput;
  console.log("Account Reference:" + transaction.reference);
  console.log("Amount: " + transaction.amount);
  const amount = transaction.amount;

  next();
};

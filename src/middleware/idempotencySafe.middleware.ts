import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";
import { getAccountTransactionByReference } from "../services/wallet.service";

//Demonstrating a middleware concept where you could make validations for the ideopotency
export const idempotencySafe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Account Reference:" + req.body.reference);
  console.log("Params", req);
  const uniqueReference = req.body.reference;
  /** TODO Check if the request has the same parameters as the already save requests if so return the same results or reject depending on the business requirement here **/
  const checkTransaction = await getAccountTransactionByReference(
    uniqueReference
  );
  console.log("Check Transaction Result:", checkTransaction);
  if (checkTransaction) {
    console.log(
      "This transaction has already been proceesed",
      checkTransaction
    );
    return res
      .status(400)
      .send({ error: "Invalid transaction -  Idempotency Check" });
  }
  next();
};

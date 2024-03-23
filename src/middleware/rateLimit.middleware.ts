import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";
import { TransactionType } from "../enums/transactionType.enum";
import { getAccountTransactionByCriteria } from "../services/wallet.service";

//Demonstrating a middleware concept where you could make validations for the rate limiting
export const validateRateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** TODO Check repository to see if this request of the same type and amount is with the stipulated time i.e 1 min **/
  const transaction = req.body as AccountTransactionInput;
  console.log("Account Reference:" + transaction.reference);
  console.log("Amount: " + transaction.amount);
  const amount = transaction.amount;
  let transactionType: string;
  if (req.path.includes("/withdraw")) {
    transactionType = TransactionType.DEBIT;
  } else if (req.path.includes("deposit")) {
    transactionType = TransactionType.CREDIT;
  } else {
    return res.status(400).send({ error: "Invalid transaction type" });
  }
  const rateLimitedTransaction = await getAccountTransactionByCriteria(
    transaction.amount,
    transactionType.toString()
  );
  console.log(rateLimitedTransaction);
  if (rateLimitedTransaction.length > 0) {
    return res.status(400).send({
      error:
        "Invalid transaction - Too many transactions of the same type flag -  Rate Limit Check",
    });
  }
  next();
};

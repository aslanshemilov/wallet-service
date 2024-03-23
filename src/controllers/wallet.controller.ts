import express, { Express, NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";
import { processTransaction } from "../services/wallet.service";
import { TransactionType } from "../enums/transactionType.enum";

export const withdrawRequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //Database calls call the service middleware
  const transaction: AccountTransactionInput =
    request.body as AccountTransactionInput;
  console.log("Account Transaction: " + JSON.stringify(transaction));
  try {
    const proceesedTransaction = await processTransaction(
      transaction.amount,
      transaction.walletAccount,
      TransactionType.DEBIT,
      transaction.reference
    );
    console.log(
      "Processed Transaction: " + JSON.stringify(proceesedTransaction)
    );
    response.send(proceesedTransaction);
  } catch (error) {
    console.log("Error processing transaction", error);
    next(error);
  }
};

export const depositRequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const transaction: AccountTransactionInput =
    request.body as AccountTransactionInput;
  console.log("Account Transaction: " + JSON.stringify(transaction));
  try {
    const proceesedTransaction = await processTransaction(
      transaction.amount,
      transaction.walletAccount,
      TransactionType.CREDIT,
      transaction.reference
    );
    console.log(
      "Processed Transaction: " + JSON.stringify(proceesedTransaction)
    );
    response.send(proceesedTransaction);
  } catch (error) {
    console.log("Error processing transaction", error);
    next(error);
  }
};

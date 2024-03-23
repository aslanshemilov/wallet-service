import express, { Express, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";
import { processTransaction } from "../services/wallet.service";
import { TransactionType } from "../enums/transactionType.enum";

export const withdrawRequestHandler = async (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  const transaction: AccountTransactionInput =
    request.body as AccountTransactionInput;
  console.log("Account Transaction: " + JSON.stringify(transaction));

  const proceesedTransaction = await processTransaction(
    transaction.amount,
    transaction.walletAccount,
    TransactionType.DEBIT,
    transaction.reference
  );
  console.log("Processed Transaction: " + JSON.stringify(proceesedTransaction));
  response.send(proceesedTransaction);
};

export const depositRequestHandler = async (
  request: Request,
  response: Response
) => {
  const transaction: AccountTransactionInput =
    request.body as AccountTransactionInput;
  console.log("Account Transaction: " + JSON.stringify(transaction));

  const proceesedTransaction = await processTransaction(
    transaction.amount,
    transaction.walletAccount,
    TransactionType.CREDIT,
    transaction.reference
  );
  console.log("Processed Transaction: " + JSON.stringify(proceesedTransaction));
  response.send(proceesedTransaction);
};

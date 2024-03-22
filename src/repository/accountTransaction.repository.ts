import { AccountTransaction } from "../interfaces/accountTransactions.interface";
const model = require("../models/account.model");

export const getAccountTransactions = () => model.find();

export const getAccountTransactionsByReference = (reference: String) =>
  model.findOne({ reference });

export const createAccountTransaction = (values: Record<string, any>) =>
  new model(values)
    .save()
    .then((transaction: AccountTransaction) => transaction);

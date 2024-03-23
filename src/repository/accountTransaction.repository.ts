import { AccountTransactionModel } from "../models/accountTransactions.model";

export const getAccountTransactions = () => AccountTransactionModel.find();

export const getAccountTransactionsByReference = (reference: string) =>
  AccountTransactionModel.findOne({ reference });

export const createAccountTransaction = async (values: Record<string, any>) =>
  await AccountTransactionModel.create(values);

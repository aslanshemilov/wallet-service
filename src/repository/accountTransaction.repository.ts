import { AccountTransactionDocument } from "../interfaces/accountTransactions.interface";
import { AccountTransactionModel } from "../models/accountTransactions.model";
import mongoose from "mongoose";

export const getAccountTransactions = () => AccountTransactionModel.find();

export const getAccountTransactionsByReference = (reference: string) =>
  AccountTransactionModel.findOne({ reference });

export const createAccountTransaction = async (values: Record<string, any>) =>
  await AccountTransactionModel.create(values);

export const getTransactionsByCriteria = async (
  amount: mongoose.Types.Decimal128,
  type: string
): Promise<AccountTransactionDocument[]> => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000); // 1 minute ago
    const transactions = await AccountTransactionModel.find({
      createdAt: { $gte: oneMinuteAgo }, // createdAt should be within 1 minute interval from now
      amount: amount, // amount should match the specified amount
      type: type, // type should match the specified type
    });

    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error}`);
  }
};

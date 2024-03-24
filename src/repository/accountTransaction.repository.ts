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

export const getCurrentBalancesByWalletAccount = async (): Promise<
  { walletAccount: string; currentBalance: number }[]
> => {
  try {
    const pipeline = [
      {
        $match: {
          status: true, // Only consider transactions with status true
        },
      },
      {
        $group: {
          _id: "$walletAccount",
          credit: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "CREDIT"] },
                then: "$amount",
                else: 0,
              },
            },
          },
          debit: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "DEBIT"] },
                then: "$amount",
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          walletAccount: "$_id",
          currentBalance: { $subtract: ["$credit", "$debit"] },
        },
      },
    ];

    const result = await AccountTransactionModel.aggregate(pipeline);

    return result;
  } catch (error) {
    throw new Error(
      `Error computing current balances by wallet account: ${error}`
    );
  }
};

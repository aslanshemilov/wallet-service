import mongoose, { Schema } from "mongoose";
import { TransactionType } from "../enums/transactionType.enum";

const AccountTransactionSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  amount: { type: mongoose.Types.Decimal128, required: true },
  status: { type: Boolean, required: true },
  walletAccount: { type: Schema.Types.ObjectId, ref: "WalletAccount" },
  type: { type: TransactionType, required: true },
});

export const AccountTransactionModel = mongoose.model(
  "AccountTransaction",
  AccountTransactionSchema
);

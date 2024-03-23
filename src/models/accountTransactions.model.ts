import { AccountTransactionDocument } from "./../interfaces/accountTransactions.interface";
import mongoose, { Model, Schema } from "mongoose";

const AccountTransactionSchema = new Schema<AccountTransactionDocument>(
  {
    reference: { type: String, required: true },
    amount: { type: mongoose.Types.Decimal128, required: true },
    status: { type: Boolean, required: true },
    walletAccount: { type: Schema.Types.ObjectId, ref: "WalletAccount" },
    type: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: "accountTransactions", // Create the collection with name 'users'
  }
);

export const AccountTransactionModel: Model<AccountTransactionDocument> =
  mongoose.model("AccountTransaction", AccountTransactionSchema);

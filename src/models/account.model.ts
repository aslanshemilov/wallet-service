import mongoose, { Model, Schema } from "mongoose";
import { WalletAccount } from "../interfaces/account.interface";

const WalletAccountSchema = new Schema<WalletAccount>(
  {
    accountNumber: { type: String, required: true, unique: true },
    openingBalance: { type: mongoose.Types.Decimal128, required: true },
    closingBalance: { type: mongoose.Types.Decimal128, required: true },
    currentBalance: { type: mongoose.Types.Decimal128, required: true }, //as transactions are happening now balance
    availableBalance: { type: mongoose.Types.Decimal128, required: true }, //delayed balance, probably will be updated by a EOD process or something
    masterAccount: { type: Schema.Types.ObjectId, ref: "MasterAccount" },
    active: { type: Boolean, required: true },
    accountType: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: "walletAccounts", // Create the collection with name 'users'
  }
);

export const WalletAccountModel: Model<WalletAccount> =
  mongoose.model<WalletAccount>("WalletAccount", WalletAccountSchema);

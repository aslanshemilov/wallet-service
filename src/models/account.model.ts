import mongoose, { Schema } from "mongoose";

const WalletAccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  openingBalance: { type: mongoose.Types.Decimal128, required: true },
  closingBalance: { type: mongoose.Types.Decimal128, required: true },
  currentBalance: { type: mongoose.Types.Decimal128, required: true }, //as transactions are happening now balance
  availableBalance: { type: mongoose.Types.Decimal128, required: true }, //delayed balance, probably will be updated by a EOD process or something
  masterAccount: { type: Schema.Types.ObjectId, ref: "MasterAccount" },
  active: { type: Boolean, required: true },
  accountType: { type: String, required: true },
});

export const WalletAccountModel = mongoose.model(
  "WalletAccount",
  WalletAccountSchema
);

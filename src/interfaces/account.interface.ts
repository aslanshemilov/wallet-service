import mongoose from "mongoose";

export interface WalletAccount {
  accountNumber: string;
  openingBalance: mongoose.Types.Decimal128;
  currentBalance: mongoose.Types.Decimal128;
  closingBalance: mongoose.Types.Decimal128;
  active: boolean;
  accountType: string;
}

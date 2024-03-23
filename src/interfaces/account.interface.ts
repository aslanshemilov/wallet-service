import mongoose, { Document } from "mongoose";
import { MasterAccountInput } from "./masterAccount.interface";

export type WalletAccount = Document & {
  accountNumber: string;
  openingBalance: mongoose.Types.Decimal128;
  currentBalance: mongoose.Types.Decimal128;
  closingBalance: mongoose.Types.Decimal128;
  availableBalance: mongoose.Types.Decimal128;
  active: boolean;
  accountType: string;
  masterAccount: MasterAccountInput;
};

import mongoose, { Document } from "mongoose";
import { MasterAccountDocument } from "./masterAccount.interface";
import { AccountType } from "../enums/accountType.enum";

export type WalletAccount = Document & {
  accountNumber?: string;
  openingBalance: mongoose.Types.Decimal128;
  currentBalance: mongoose.Types.Decimal128;
  closingBalance: mongoose.Types.Decimal128;
  availableBalance: mongoose.Types.Decimal128;
  active?: boolean | false;
  accountType?: string | AccountType.CURRENT;
  masterAccount: MasterAccountDocument["_id"];
};

export type WalletAccountInput = {
  accountNumber?: string;
  openingBalance: mongoose.Types.Decimal128;
  currentBalance?: mongoose.Types.Decimal128;
  closingBalance?: mongoose.Types.Decimal128;
  availableBalance?: mongoose.Types.Decimal128;
  active?: boolean | false;
  accountType?: string | AccountType.CURRENT;
  masterAccount: MasterAccountDocument["_id"];
};

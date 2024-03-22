import { WalletAccount } from "./account.interface";
import mongoose from "mongoose";
import { TransactionType } from "../enums/transactionType.enum";

export interface AccountTransaction {
  reference: string;
  type: TransactionType;
  amount: mongoose.Types.Decimal128;
  status: boolean;
}

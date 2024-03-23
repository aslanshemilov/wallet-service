import { WalletAccount } from "./account.interface";
import mongoose from "mongoose";
import { TransactionType } from "../enums/transactionType.enum";

export type AccountTransactionInput = {
  reference: string;
  type?: TransactionType;
  amount: mongoose.Types.Decimal128;
  status?: boolean;
  walletAccount: WalletAccount["_id"];
};

export type AccountTransactionDocument = Document & {
  reference: string;
  type: TransactionType;
  amount: mongoose.Types.Decimal128;
  status: boolean;
  walletAccount: WalletAccount["_id"];
};

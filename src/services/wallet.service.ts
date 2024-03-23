import { TransactionType } from "./../enums/transactionType.enum";
import { AccountTransactionInput } from "./../interfaces/accountTransactions.interface";
import { WalletAccount } from "../interfaces/account.interface";
import { createAccountTransaction } from "../repository/accountTransaction.repository";
import mongoose from "mongoose";
import { updateWalletAccountBalancesById } from "./accounts.service";

export const processTransaction = async (
  amount: mongoose.Types.Decimal128,
  walletAccount: WalletAccount["_id"],
  transactionType: TransactionType,
  transaction_reference: string
) => {
  const transaction: AccountTransactionInput = {
    reference: transaction_reference,
    type: transactionType,
    amount: amount,
    status: true,
    walletAccount: walletAccount,
  };
  console.log("Credit the wallet account with funds");
  const credit = await createAccountTransaction(transaction);
  if (credit["_id"] != null || credit["_id"] != undefined) {
    //Update Wallet Balances
    console.log("Succefully credited wallet, let's update the balances.");

    const update = await updateWalletAccountBalancesById(
      credit["walletAccount"],
      amount,
      transactionType
    );
    console.log("Finished updating wallet balances");
    console.log(update);
    return update;
  }
  return null;
};

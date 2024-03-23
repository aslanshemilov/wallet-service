import { TransactionType } from "../enums/transactionType.enum";
import {
  WalletAccount,
  WalletAccountInput,
} from "../interfaces/account.interface";
import {
  createWalletAccount,
  getWalletById,
  updateWalletAccountById,
} from "../repository/account.repository";
import {
  generateAccountNumber,
  generateRandomBase64Reference,
} from "../utils/utls";
import mongoose from "mongoose";
import { processTransaction } from "./wallet.service";

export const addWalletAccount = async (account: WalletAccountInput) => {
  console.log("createWalletAccount", account);
  const ZERO = mongoose.Types.Decimal128.fromString("0.0");
  const accountNumber = generateAccountNumber(10);
  console.log("Generated Account Number", accountNumber);
  account.accountNumber = accountNumber;
  //Init current and available balances
  account.currentBalance =
    parseFloat(account.openingBalance.toString()) > 0.0
      ? account.openingBalance
      : account.currentBalance;

  account.availableBalance =
    parseFloat(account.openingBalance.toString()) > 0.0
      ? account.openingBalance
      : account.availableBalance;

  account.closingBalance = ZERO;

  const wallet = await createWalletAccount(account);
  console.log("Finished created wallet");

  if (
    wallet["_id"] !== undefined &&
    account.currentBalance !== undefined &&
    parseFloat(account.openingBalance.toString()) > 0.0
  ) {
    console.log("Wallet Successfully Created Let's Credit the Wallet");
    const transaction_reference = generateRandomBase64Reference(12);
    await processTransaction(
      account.currentBalance,
      wallet["_id"],
      TransactionType.CREDIT,
      transaction_reference
    );
    console.log("Successfully Credited the wallet");
    return wallet;
  }
  return null;
};

export const updateWalletAccountBalancesById = async (
  walletId: WalletAccount["_id"],
  amount: mongoose.Types.Decimal128,
  transactionType: TransactionType
) => {
  let wallet = await getWalletById(walletId);
  console.log(
    `Getting wallet by id in order to update balances: Wallet Id: ${walletId}`,
    wallet
  );

  const ZERO = mongoose.Types.Decimal128.fromString("0.0");
  if (wallet !== null && wallet !== undefined) {
    console.log("Found the Wallet");
    if (transactionType === TransactionType.CREDIT) {
      //Update the current balance
      const currentBalance = wallet?.currentBalance || ZERO;
      // Convert currentBalance to a number for arithmetic operations
      const currentBalanceNumeric = parseFloat(currentBalance.toString());
      // Add the amount to the currentBalanceNumeric
      const newBalanceNumeric =
        currentBalanceNumeric + parseFloat(amount.toString());
      // Convert the result back to Decimal128
      wallet.currentBalance = mongoose.Types.Decimal128.fromString(
        newBalanceNumeric.toString()
      );

      //Update available Balance
      const availableBalance = wallet.availableBalance || ZERO;
      const availableBalanceNumeric = parseFloat(availableBalance.toString());
      const newAvBalanceNumeric =
        availableBalanceNumeric + parseFloat(amount.toString());
      wallet.availableBalance = mongoose.Types.Decimal128.fromString(
        newAvBalanceNumeric.toString()
      );
    } else if (transactionType === TransactionType.DEBIT) {
      //Update the current balance
      const currentBalance = wallet.currentBalance || ZERO;
      // Convert currentBalance to a number for arithmetic operations
      const currentBalanceNumeric = parseFloat(currentBalance.toString());
      // Add the amount to the currentBalanceNumeric
      const newBalanceNumeric =
        currentBalanceNumeric - parseFloat(amount.toString());
      // Convert the result back to Decimal128
      wallet.currentBalance = mongoose.Types.Decimal128.fromString(
        newBalanceNumeric.toString()
      );

      //Update available Balance
      const availableBalance = wallet.availableBalance || ZERO;
      const availableBalanceNumeric = parseFloat(availableBalance.toString());
      const newAvBalanceNumeric =
        availableBalanceNumeric - parseFloat(amount.toString());
      wallet.availableBalance = mongoose.Types.Decimal128.fromString(
        newAvBalanceNumeric.toString()
      );
    } else {
      console.log(
        "Throw exception Invalid transaction type: " + transactionType
      );
      return;
    }
    console.log("Finally let's update the balance");
    return await updateWalletAccountById(walletId, wallet);
  }
  return null;
};

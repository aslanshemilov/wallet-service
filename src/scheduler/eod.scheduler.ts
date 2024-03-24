//To avoind race condtions and Such, we need to schedler that will be strictly response for updating the balanaces at the end of the day i.e available balance, that is the true balance.

import { WalletAccountModel } from "../models/account.model";
import { computeCurrentBalance } from "../services/wallet.service";
import mongoose from "mongoose";

export const computeEndOfDayBalance = async (): Promise<void> => {
  const walletBalanceList = await computeCurrentBalance();
  console.log("Account Current Balance list: ", walletBalanceList);
  walletBalanceList.forEach(async (wallet) => {
    const walletAccount = await WalletAccountModel.findOne({
      _id: wallet.walletAccount,
    });

    if (walletAccount) {
      console.log("Wallet found");
      // Update the current balance and available balance
      walletAccount.currentBalance = mongoose.Types.Decimal128.fromString(
        wallet.currentBalance.toString()
      );
      walletAccount.availableBalance = mongoose.Types.Decimal128.fromString(
        wallet.currentBalance.toString()
      ); // Update available balance based on current balance

      // Save the updated wallet account
      await walletAccount.save();
      console.log("Updated wallet balances successfully: ", walletAccount);
    }
  });
};

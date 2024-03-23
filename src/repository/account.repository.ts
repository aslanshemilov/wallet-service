import { WalletAccountModel } from "../models/account.model";

export const getWalletAccounts = () => WalletAccountModel.find();

export const getWalletById = async (walletId: string) =>
  await WalletAccountModel.findById(walletId);

export const getWalletAccountsByAccountNumber = async (accountNumber: string) =>
  await WalletAccountModel.findOne({ accountNumber });

export const createWalletAccount = async (values: Record<string, any>) =>
  await WalletAccountModel.create(values);

export const deleteWalletAccountById = (id: string) =>
  WalletAccountModel.findByIdAndDelete(id);

export const updateWalletAccountById = async (
  id: string,
  values: Record<string, any>
) => await WalletAccountModel.findByIdAndUpdate(id, values);

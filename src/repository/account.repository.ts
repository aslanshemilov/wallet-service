import { Model } from "mongoose";
import { WalletAccount } from "../interfaces/account.interface";

const model: Model<WalletAccount> = require("../models/account.model");

export const getWalletAccounts = () => model.find();

export const getWalletAccountsByReference = (reference: String) =>
  model.findOne({ reference });

export const createWalletAccount = (values: Record<string, any>) =>
  new model(values).save().then((wallet: WalletAccount) => wallet);

export const deleteWalletAccountById = (id: string) =>
  model.findByIdAndDelete(id);

export const updateWalletAccountById = (
  id: string,
  values: Record<string, any>
) => model.findByIdAndUpdate(id, values);

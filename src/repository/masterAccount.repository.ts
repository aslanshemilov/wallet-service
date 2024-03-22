import { MasterAccount } from "../interfaces/masterAccount.interface";
const model = require("../models/masterAccount.model");

export const getMasterAccounts = () => model.find();

export const getMasterAccountsByReference = (reference: String) =>
  model.findOne({ reference });

export const createMasterAccount = (values: Record<string, any>) =>
  new model(values).save().then((account: MasterAccount) => account);

export const deleteMasterAccountById = (id: string) =>
  model.findByIdAndDelete(id);

export const updateMasterAccountById = (
  id: string,
  values: Record<string, any>
) => model.findByIdAndUpdate(id, values);

import { MasterAccountModel } from "../models/masterAccount.model";

export const getMasterAccounts = () => MasterAccountModel.find();

// export const getMasterAccountsByReference = async (reference: String) =>
//   MasterAccountModel.findOne({ reference });

export const createMasterAccount = async (values: Record<string, any>) =>
  MasterAccountModel.create(values);

export const deleteMasterAccountById = (id: string) =>
  MasterAccountModel.findByIdAndDelete(id);

export const updateMasterAccountById = (
  id: string,
  values: Record<string, any>
) => MasterAccountModel.findByIdAndUpdate(id, values);

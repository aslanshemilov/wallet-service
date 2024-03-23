import { MasterAccountInput } from "../interfaces/masterAccount.interface";
import { createMasterAccount } from "../repository/masterAccount.repository";

export const addNewMasterAccount = async (
  masterAccount: MasterAccountInput
) => {
  return await createMasterAccount(masterAccount);
};

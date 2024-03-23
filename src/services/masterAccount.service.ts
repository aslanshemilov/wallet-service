import { MasterAccountDocument } from "./../interfaces/masterAccount.interface";
import { generateRandomBase64Reference } from "./../utils/utls";
import { MasterAccountInput } from "../interfaces/masterAccount.interface";
import { createMasterAccount } from "../repository/masterAccount.repository";

export const addNewMasterAccount = async (
  masterAccount: MasterAccountInput
) => {
  console.log("We are now in the service");
  const reference = generateRandomBase64Reference(10);
  masterAccount.reference = reference;
  return await createMasterAccount(masterAccount);
};

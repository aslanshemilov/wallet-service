import { Document } from "mongoose";

export type MasterAccountDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  reference: string;
};

export type MasterAccountInput = {
  firstName: MasterAccountDocument["firstName"];
  lastName: MasterAccountDocument["lastName"];
  email: MasterAccountDocument["email"];
  idNumber: MasterAccountDocument["idNumber"];
};

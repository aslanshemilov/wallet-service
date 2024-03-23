import mongoose, { Schema, Model } from "mongoose";
import { MasterAccountDocument } from "../interfaces/masterAccount.interface";

const MasterAccountSchema = new Schema<MasterAccountDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  reference: { type: String, required: true },
  idNumber: { type: String, required: true },
});

export const MasterAccountModel: Model<MasterAccountDocument> = mongoose.model(
  "MasterAccount",
  MasterAccountSchema
);

// export const MasterAccountModel = mongoose.model<MasterAccount>(
//   "MasterAccount",
//   MasterAccountSchema
// );

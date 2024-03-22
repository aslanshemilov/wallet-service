import mongoose from "mongoose";

const MasterAccountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  reference: { type: String, required: true },
  idNumber: { type: String, required: true },
});

export const MasterAccountModel = mongoose.model(
  "MasterAccount",
  MasterAccountSchema
);

import mongoose, { Schema, Model } from "mongoose";
import { MasterAccountDocument } from "../interfaces/masterAccount.interface";

const MasterAccountSchema = new Schema<MasterAccountDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    reference: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: "masterAccounts", // Create the collection with name 'users'
  }
);

export const MasterAccountModel: Model<MasterAccountDocument> = mongoose.model(
  "MasterAccount",
  MasterAccountSchema
);

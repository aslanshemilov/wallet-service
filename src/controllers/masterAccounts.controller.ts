import express, { Express, Request, Response } from "express";
import { MasterAccountInput } from "../interfaces/masterAccount.interface";
import { addNewMasterAccount } from "../services/masterAccount.service";
import { Error } from "mongoose";

export const getMasterAccountsHandler = (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const createMasterAccountHandler = async (
  request: Request,
  response: Response
) => {
  console.log(request.body);
  const masterAccount: MasterAccountInput = request.body as MasterAccountInput;
  console.log("Received master account: " + masterAccount.firstName);
  //Database calls call the service middleware
  try {
    await addNewMasterAccount(masterAccount);
    return response.sendStatus(200);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
};

export const getMasterAccountByReferenceHandler = (
  request: Request,
  response: Response
) => {
  var reference: string = request.params.reference;
  //Database calls call the service middleware
  return response.send(200);
};

export const deleteMasterAccountByReferenceHandler = (
  request: Request,
  response: Response
) => {
  var reference: string = request.params.reference;
  //Database calls call the service middleware
  return response.send(200);
};

export const updateMasterAccountByReferenceHandler = (
  request: Request,
  response: Response
) => {
  var reference: string = request.params.reference;
  //Database calls call the service middleware
  return response.send(200);
};

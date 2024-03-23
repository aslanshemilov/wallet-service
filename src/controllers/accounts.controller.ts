import express, { Express, Request, Response } from "express";
import {
  WalletAccount,
  WalletAccountInput,
} from "../interfaces/account.interface";
import { addWalletAccount } from "../services/accounts.service";

export const getAccountsHandler = (request: Request, response: Response) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const createAccountHandler = async (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  const account: WalletAccountInput = request.body as WalletAccountInput;
  const wallet = await addWalletAccount(account);
  console.log("Wallet created response: " + JSON.stringify(wallet));
  return response.send(wallet);
};

export const getAccountByAccountNumberHandler = (
  request: Request,
  response: Response
) => {
  var accountNumber: string = request.params.accountNumber;
  //Database calls call the service middleware
  return response.send(200);
};

export const deleteAccountByAccountNumberHandler = (
  request: Request,
  response: Response
) => {
  var accountNumber: string = request.params.accountNumber;
  //Database calls call the service middleware
  return response.send(200);
};

export const updateAccountByAccountNumberHandler = (
  request: Request,
  response: Response
) => {
  var accountNumber: string = request.params.accountNumber;
  //Database calls call the service middleware
  return response.send(200);
};

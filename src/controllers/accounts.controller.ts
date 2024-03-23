import express, { Express, NextFunction, Request, Response } from "express";
import {
  WalletAccount,
  WalletAccountInput,
} from "../interfaces/account.interface";
import {
  addWalletAccount,
  getAccountByAccountNumber,
} from "../services/accounts.service";

export const getAccountsHandler = (request: Request, response: Response) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const createAccountHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //Database calls call the service middleware
  const account: WalletAccountInput = request.body as WalletAccountInput;
  try {
    const wallet = await addWalletAccount(account);
    console.log("Wallet created response: " + JSON.stringify(wallet));
    return response.send(wallet);
  } catch (error) {
    console.log("Error creating wallet");
    next(error);
  }
};

export const getAccountByAccountNumberHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  var accountNumber: string = request.params.accountNumber;
  //Database calls call the service middleware
  try {
    const wallet = await getAccountByAccountNumber(accountNumber);
    return response.send(wallet);
  } catch (error) {
    console.log("Error getting wallet", error);
    next(error);
  }
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

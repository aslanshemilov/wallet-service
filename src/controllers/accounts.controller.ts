import express, { Express, Request, Response } from "express";

export const getAccountsHandler = (request: Request, response: Response) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const createAccountHandler = (request: Request, response: Response) => {
  //Database calls call the service middleware
  return response.send(200);
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

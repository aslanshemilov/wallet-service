import express, { Express, Request, Response } from "express";

export const getMasterAccountsHandler = (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const createMasterAccountHandler = (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  return response.send(200);
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

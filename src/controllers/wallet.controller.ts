import express, { Express, Request, Response } from "express";

export const withdrawRequestHandler = (
  request: Request,
  response: Response
) => {
  //Database calls call the service middleware
  return response.send(200);
};

export const depositRequestHandler = (request: Request, response: Response) => {
  //Database calls call the service middleware
  return response.send(200);
};

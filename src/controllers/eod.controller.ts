import { NextFunction, Request, Response } from "express";
import { computeEndOfDayBalance } from "../scheduler/eod.scheduler";

export const computeBalanceEndOfDayHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //Database calls call the service middleware
  try {
    computeEndOfDayBalance();
    response.send("EOD succesffull Started..");
  } catch (err) {
    console.log("Something went wrong", err);
    next(err);
  }
};

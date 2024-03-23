import { NextFunction, Request, Response } from "express";
import { computeEndOfDayBalance } from "../scheduler/eod.scheduler";

export const computeBalanceEndOfDayHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //Database calls call the service middleware
  try {
    //No await as this will run asynchronously at the background
    computeEndOfDayBalance();
    response.send({ success: "EOD Succesffull Started." });
  } catch (err) {
    console.log("Something went wrong", err);
    next(err);
  }
};

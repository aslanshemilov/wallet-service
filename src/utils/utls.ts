import { randomBytes } from "crypto";

export const generateRandomBase64Reference = (length: number): string => {
  const randomBytesBuffer = randomBytes(length);
  return randomBytesBuffer.toString("base64");
};

export const generateAccountNumber = (length: number): string => {
  const businessCode = "1234"; // Example business code
  const accountNumberLength = length; // Example length of the account number
  let accountNumber = businessCode;

  // Generate random digits for the rest of the account number
  for (let i = businessCode.length; i < accountNumberLength; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }

  return accountNumber;
};

import { randomBytes } from "crypto";

export const generateRandomBase64Reference = (length: number): string => {
  const randomBytesBuffer = randomBytes(length);
  return randomBytesBuffer.toString("base64");
};

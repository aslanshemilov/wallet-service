//To avoind race condtions and Such, we need to schedler that will be strictly response for updating the balanaces at the end of the day i.e available balance, that is the true balance.

import { computeCurrentBalance } from "../services/wallet.service";

export const computeEndOfDayBalance = async () => {
  const current = await computeCurrentBalance();
  console.log("Account Current Balance: ", current);
};

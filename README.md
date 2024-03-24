## Wallet Service

This is a basic wallet crud service

## Stack

- Node : 18
- The service is build with node, express js with TypeScript and MongoDB as the database with Mongoose as the ORM.

## Getting Started.

- I have shared the postman collections in the resources folder inside the resources folder which is in the root folder of this project.
- You need to make sure you import both files inside your postman.

## Design Pattern (MVC - Middleware Pattern)

The service is build with a MVC design pattern this allows the following

- **Seperation of Consents** MVC enforces a clear separation between different aspects of your application: the Model (data and business logic), View (presentation layer), and Controller (handling user input and interactions). This separation makes your codebase easier to understand, maintain, and scale.
- **Modularity** MVC encourages modularity by breaking down your application into smaller, manageable components. Each component (Model, View, Controller) can be developed, tested, and modified independently, promoting code reusability and maintainability.
- **Scalability** This is one of the most fundamental principle as it promotes a structured approach to development, making it easier to scale your application as it grows. You can add new features or modify existing ones without drastically affecting other parts of the application, thus reducing the risk of introducing bugs.
- **Testability** it's easier to write unit tests for each component separately. You can test models for data integrity and business logic, controllers for request handling and response generation, and views for rendering correctness. This makes your codebase more robust and less error-prone.

## Wallet Basic Architecture

Here i have introduced 3 fundamental services for managing and interacting with our wallet service.

- 1. **_Master Account_** - The master service is responsible creating and managing the user. For the user to have a wallet with us we need some sort of service that we can quickly reference to get all associated transactions we have with that specific user.

- 2. **_Wallet Account / Account_** - This is where all the magic happens. Here i have kept a one to many relashionship between the master account and the Wallet.
     The idea here is to have our clients have the ability to open more than one wallet/account for different use cases eg Savings Account, Current Account, Credit Account, Credit Token Account e.t.c

- 3. **Account Transactions\*** - Then finally i have the Account Transactions service which has a one to many relationship with the wallet/account. Here is where all debit and credit happens i.e our withdrawal and deposits.

# Financial Exploitations

Since im using one stack here, with limited time constraints im quite limited to what i can show-case, but neverthless is the basic approach im going to take.

## HANDLING WITHDRAWALS (CREDITS) & DEPOSITS (DEBITS)

This could be anything for a wallet service, sending money to a paybill, withdraw cash from some till etc, i will demostrate the high- level processing for this transaction, and deposit could be anthing, opening a new account with some balance, recieving funds etc

1. **_IDEPOTENCY_** is one of the sucurity issues that payment systems have.
   To make a withdraw, im going to save them for processing, using the initiation-request ack pattern.

- First a request is made with a unique reference.
- Stored into some job somewhere for executation (in this demo will i will use a save and reference approach)
- Process and Debit the account
- The response send back the client via some webhook or something.

* Now for the purposes of this demo i have implemented a middleware that will check if the parsed transaction reference has already been processed. The middleware approach will make our execution faster, since we are performing the logic almost at the **rest** layer.

```ts
import { NextFunction, Request, Response } from "express";
import { getAccountTransactionByReference } from "../services/wallet.service";

//Demonstrating a middleware concept where you could make validations for the ideopotency
export const idempotencySafe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Account Reference:" + req.body.reference);
  console.log("Params", req);
  const uniqueReference = req.body.reference;
  /** TODO Check if the request has the same parameters as the already save requests if so return the same results or reject depending on the business requirement here **/
  const checkTransaction = await getAccountTransactionByReference(
    uniqueReference
  );
  console.log("Check Transaction Result:", checkTransaction);
  if (checkTransaction) {
    console.log(
      "This transaction has already been proceesed",
      checkTransaction
    );
    return res
      .status(400)
      .send({ error: "Invalid transaction -  Idempotency Check" });
  }
  next();
};
```

2. **_RATE-LIMIT_**

   - Rate limitting is one of the most important apsects to avoid exploitation from possible intruders.
   - Best way to implement rate limitting will be on some sort of load balancer within your cluster.
   - In this case i will implement this with a simple middleware pattern, that will check if we have a transaction of the same amount and type within 1 min time interval. If so we need to immediately reject the transaction see sample below:

```ts
import { NextFunction, Request, Response } from "express";
import { AccountTransactionInput } from "../interfaces/accountTransactions.interface";
import { TransactionType } from "../enums/transactionType.enum";
import { getAccountTransactionByCriteria } from "../services/wallet.service";

//Demonstrating a middleware concept where you could make validations for the rate limiting
export const validateRateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** TODO Check repository to see if this request of the same type and amount is with the stipulated time i.e 1 min **/
  const transaction = req.body as AccountTransactionInput;
  console.log("Account Reference:" + transaction.reference);
  console.log("Amount: " + transaction.amount);
  const amount = transaction.amount;
  let transactionType: string;
  if (req.path.includes("/withdraw")) {
    transactionType = TransactionType.DEBIT;
  } else if (req.path.includes("deposit")) {
    transactionType = TransactionType.CREDIT;
  } else {
    return res.status(400).send({ error: "Invalid transaction type" });
  }
  const rateLimitedTransaction = await getAccountTransactionByCriteria(
    transaction.amount,
    transactionType.toString()
  );
  console.log(rateLimitedTransaction);
  if (rateLimitedTransaction.length > 0) {
    return res.status(400).send({
      error:
        "Invalid transaction - Too many transactions of the same type flag -  Rate Limit Check",
    });
  }
  next();
};
```

3. **_UNIQUE REFERENCES ON EACH TRANSACTION_**

   - Here i also implemented a unique reference on each transaction. This we can make sure that at a internal DB level, we are not going to have transactions that are going to share the same origination reference.

4. **_RUNNING START AND END OF DAY JOBS_**
   - Transaction Balances need to be handled with care to get full customer satification. One of the the disapointing aspect from the client and complience perspective is to have a system that can sometimes in-accurately display running balannces.
   - In this demo i have tackled this challenge by introducing two running balance fields (current balance and available balance) in my wallet account model.

```ts
import mongoose, { Model, Schema } from "mongoose";
import { WalletAccount } from "../interfaces/account.interface";

const WalletAccountSchema = new Schema<WalletAccount>(
  {
    accountNumber: { type: String, required: true, unique: true },
    openingBalance: { type: mongoose.Types.Decimal128, required: true },
    closingBalance: { type: mongoose.Types.Decimal128, required: true },
    currentBalance: { type: mongoose.Types.Decimal128, required: true }, //as transactions are happening now balance
    availableBalance: { type: mongoose.Types.Decimal128, required: true }, //delayed balance, probably will be updated by a EOD process or something
    masterAccount: { type: Schema.Types.ObjectId, ref: "MasterAccount" },
    active: { type: Boolean, required: true },
    accountType: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: "walletAccounts", // Create the collection with name 'users'
  }
);

export const WalletAccountModel: Model<WalletAccount> =
  mongoose.model<WalletAccount>("WalletAccount", WalletAccountSchema);
```

- This idea here is you can have the current balance showing the current balance of transactions as they happen in the system.
- One catch of having current balance only is if thre are transactions that are later reversed, or fail, delayed, it might be a bit messy to always update the field in real as these transactions happen maybe via webhook, queues etc.
- This is where available balance comes in , available balance will be slighly delayed or behind the current balance since this field will be updated by internal processes like Start of Day and End Of Day Jobs.

I have implement an end of day route which you can directly invoke from postman, this will update both the current and available balance at the end of the day.

```ts
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
```

## Testing

- To test this service i have implemented 5 basic endpoints. You need to test them in order as i have wrote some postman scripts that will update the env variables for each request.

### 1. Create Master Account - POST {{base_url}}/master

```json
{
  "firstName": "Britney",
  "lastName": "Lukas",
  "email": "lkas@yahoo.com",
  "idNumber": "SD4390549035"
}
```

Response:
Take note i will use the \_id in the next request

```json
{
  "firstName": "Britney",
  "lastName": "Lukas",
  "email": "lkas@yahoo.com",
  "reference": "xR73K0H6WQMGAA==",
  "idNumber": "SD4390549035",
  "_id": "65ffc3ee331f76786455d944",
  "createdAt": "2024-03-24T06:10:54.377Z",
  "updatedAt": "2024-03-24T06:10:54.377Z",
  "__v": 0
}
```

### 2. Create Account / Wallet - POST {{base_url}}/account

Here im create a wallet / account and in this case in a Current Account. Notice im inject the master account id which has been saved in the postman env varialbe from the first request.

```json
{
  "accountType": "CURRENT",
  "openingBalance": "5000",
  "masterAccount": "{{master_account_id}}",
  "active": true
}
```

Response:
Notice the system automatically generated an account number, opening, available and current balanced have been updated.

```json
{
  "accountNumber": "1234808162",
  "openingBalance": {
    "$numberDecimal": "5000"
  },
  "closingBalance": {
    "$numberDecimal": "0.0"
  },
  "currentBalance": {
    "$numberDecimal": "5000"
  },
  "availableBalance": {
    "$numberDecimal": "5000"
  },
  "masterAccount": "65ffc3ee331f76786455d944",
  "active": true,
  "accountType": "CURRENT",
  "_id": "65ffc4c7331f76786455d946",
  "createdAt": "2024-03-24T06:14:31.892Z",
  "updatedAt": "2024-03-24T06:14:31.892Z",
  "__v": 0
}
```

I will also save the \_id in the env variables to be used for later when we are now making our transactions.

### 3. Deposit-Credit - POST {{base_url}}/wallet/deposit

Now lets make our first deposit into our wallet.

```json
{
  "reference": "RANDOM_UNIQUE_REFERENCE1234901",
  "amount": 12.0,
  "walletAccount": "{{wallet_account_id}}"
}
```

- Make sure you insert a unique reference here for each and every request.
- This pattern of making the client provide the random reference is mainly idempotency check.

* 1.  For idopotency check - Here if this is a paymnt system being consumed by other servers you would typically have them submit their unique reference which you will then use to when you send the response back to their webhook. Also we need to check if the request are not intended as duplicates.
      **_However this pattern is highly opinionated as some would suggest generating these references from the server and have the client save them on their end to match responses._**

2. Rate Limiting - The amount and transaction type which is going to be infered using the url is going to be used to rate limit check. We will reject requests on the same type and amount within a 1 min time interval.

Successfully response, if there are no flags on idepotency and rate limit checks.

Response:

Notice here i deribalately returned the same amount since this for the most part will be an asynchous request. Now check the balance to see if the request has been processed successfully.

```json
{
  "_id": "65ffc4c7331f76786455d946",
  "accountNumber": "1234808162",
  "openingBalance": {
    "$numberDecimal": "5000"
  },
  "closingBalance": {
    "$numberDecimal": "0.0"
  },
  "currentBalance": {
    "$numberDecimal": "5000"
  },
  "availableBalance": {
    "$numberDecimal": "5000"
  },
  "masterAccount": "65ffc3ee331f76786455d944",
  "active": true,
  "accountType": "CURRENT",
  "createdAt": "2024-03-24T06:14:31.892Z",
  "updatedAt": "2024-03-24T06:14:31.892Z",
  "__v": 0
}
```

### 3.1 Check Balance after Credit - POST {{base_url}}/account/{{account_number}}

Its a get request and here is the response

```json
{
  "_id": "65ffc4c7331f76786455d946",
  "accountNumber": "1234808162",
  "openingBalance": {
    "$numberDecimal": "5000"
  },
  "closingBalance": {
    "$numberDecimal": "0.0"
  },
  "currentBalance": {
    "$numberDecimal": "5012"
  },
  "availableBalance": {
    "$numberDecimal": "5012"
  },
  "masterAccount": "65ffc3ee331f76786455d944",
  "active": true,
  "accountType": "CURRENT",
  "createdAt": "2024-03-24T06:14:31.892Z",
  "updatedAt": "2024-03-24T06:24:56.447Z",
  "__v": 0
}
```

### Section 4 and 4.1 demostrate the Debts. Debit amount and check balance

### End Of Day Job - GET {{base_url}}/job/endOfDay

This section demonstrates an idea of updating balances at the end of the day once all reconciliation is done. This approach will make sure that our current balance and available balance are aligned at the end of the day.

Response:

Simple success response as this will be run asynchronously at the background.

```json
{
  "success": "EOD Succesffull Started."
}
```

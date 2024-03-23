## Wallet Service

This is a basic wallet crud service

## Stack

- Node : 18
- The service is build with node, express js with TypeScript and MongoDB as the database.

## Design Pattern (MVC - Middleware Pattern)

The service is build with a MVC design pattern this allows the following

- **Seperation of Consents** MVC enforces a clear separation between different aspects of your application: the Model (data and business logic), View (presentation layer), and Controller (handling user input and interactions). This separation makes your codebase easier to understand, maintain, and scale.
- **Modularity** MVC encourages modularity by breaking down your application into smaller, manageable components. Each component (Model, View, Controller) can be developed, tested, and modified independently, promoting code reusability and maintainability.
- **Scalability** This is one of the most fundamental principle as it promotes a structured approach to development, making it easier to scale your application as it grows. You can add new features or modify existing ones without drastically affecting other parts of the application, thus reducing the risk of introducing bugs.
- **Testability** it's easier to write unit tests for each component separately. You can test models for data integrity and business logic, controllers for request handling and response generation, and views for rendering correctness. This makes your codebase more robust and less error-prone.

## Wallet Basic Architecture

Here i have introduced 3 fundamental services of managing and interacting with our wallet service.

- 1. **_Master Account_** - The master service is responsible creating and managing the user. For the user to have a wallet with us we need some sort of service that we can quicly reference to get all associated transactions we have with that specific user.

- 2. **_Wallet Account / Account_** - This is where all the magic happens. Here i have kept a one to many relashionship between the master account and the Wallet.
     The idea here is to have our clients have the ability to open more than one wallet/account for different use cases eg Saving Account, Current Account, Credit Account, Credit Token Account e.t.c

- 3. **Account Transactions\*** - Then finally i have the Account Transactions service which has a one to many relationship with the wallet/account. Here is where all debit and credit happens i.e our withdrawal and deposits.

# Financial Exploitations

Since im using one stack here, with limited time constraints im quite limited to what i can show-case, but neverthless is is the basic approach im going to take.

## HANDLING WITHDRAWALS (CREDITS)

This could be anything for a wallet service, sending money to a paybill, withdraw cash from some till etc, i will demostrate the high- level processing for this transaction.

1. **_IDEOPOTENCY_** is one of the sucurity issues that payment systems have.
   To make a withdraw, im going to save them for processing, using the initiation-request ack pattern.

- First a request is made with a unique reference.
- Stored into some job somewhere for executation (in this demo will use a simple delay)
- Process and Debit the account
- The response send back the client via some webhook or something.

2. **_RATE-LIMIT_**
   - Rate limitting is one of the most important apsects to avoid exploitation form possible intruders.
   - Best way to implement rate limitting will be on some sort of load balancer with your cluster.
   - In this case i will implement this inside the withdraw method to check if we dont have the same request (amount, reference) from the same user with 1 minute.

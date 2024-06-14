export default class Bank {
    #accountID;
    #transactionID;
    constructor(name) {
      this.name = name;
      this.#accountID = 1;
      this.#transactionID = 1;
    }
  
    createAccount() {
      return new Account(this.#accountID);
      this.#accountID++;
    }
  
    deposit(account, amount) {
      let currentAccountBalance = account.getBalance();
      let newAccountBalance = currentAccountBalance + amount;
      let deposit = new Transaction(
        this.#transactionID,
        amount,
        0,
        newAccountBalance
      );
      account.addTransaction(deposit);
      this.#transactionID++;
    }
  
    withdraw(account, amount) {
      let currentAccountBalance = account.getBalance();
      let newAccountBalance = currentAccountBalance - amount;
      let withdraw = new Transaction(
        this.#transactionID,
        0,
        amount,
        newAccountBalance
      );
      account.addTransaction(withdraw);
      this.#transactionID++;
    }
  }
  
  export class Account {
    #id;
    #transactions = [];
  
    constructor(id) {
      this.#id = id;
    }
  
    addTransaction(transaction) {
      if (!transaction.instanceOf(Transaction)) throw "unknown data";
  
      this.#transactions.unshift(transaction);
    }
  
    printStatement(openingDate, closingDate) {
      console.log("date       ||credit        ||debit     ||balance       ");
      this.#transactions.forEach((transaction) => {
        console.log(
          `${transaction.date}        ||${transaction.credit}     ||${transaction.debit}      ||${transaction.balance}        `
        );
      });
    }
  
    getBalance() {
      return this.#transactions.reduce((prev, curr, index) => {
        prev + curr.credit - curr.debit;
      }, 0);
    }
  }
  
  export class Transaction {
    #id;
    #date;
    #credit;
    #debit;
    #balance;
  
    constructor(id, date, credit, debit, balance) {
      if (id === undefined || id === null || id === NaN) throw "id is required";
  
      if (date === undefined || date === null || date.trim().length === 0)
        throw "date is required";
  
      if (credit === undefined || credit === null || credit === NaN)
        throw "credit is required";
  
      if (debit === undefined || debit === null || debit === NaN)
        throw "debit is required";
  
      if (balance === undefined || balance === null || balance === NaN)
        throw "balance is required";
  
      this.#id = id;
      this.#date = date;
      this.#credit = credit;
      this.#debit = debit;
      this.#balance = balance;
    }
  }
  
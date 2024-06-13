export default class BankSystem {
    #accountID;
    #transactionID;
    constructor(name) {
      this.name = name;
      this.#accountID = 1;
      this.#transactionID = 1;
    }
  
}
 

export class Account {
  #id; 
  #transactions = [];
}

export class Transaction {
  #id;
  #date;
  #credit;
  #debit;
  #balance;

  constructor(id, date, credit, debit, currentBalance) {
    this.#id = id;
    this.#date = date;
    this.#credit = credit;
    this.#debit = debit;
    this.#balance = currentBalance + credit - debit;
  }
}

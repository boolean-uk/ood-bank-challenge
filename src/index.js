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
    this.#balance = currentBalance + credit - debit;
  }
}

export default class BankSystem {}

export class Account {
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

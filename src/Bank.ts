export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

interface Transaction {
  type: TransactionType;
  amount: number;
  date: Date;
}

export class Bank {

}

module.exports = Bank
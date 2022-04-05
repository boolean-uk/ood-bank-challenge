import Account from '../accounts/Account';
import Transaction from '../transactions/Transaction.model';

export default class Statement {
  account : Account;

  transactions: Transaction[];

  constructor(account : Account) {
    this.transactions = account.transactions;
    this.account = account;
  }

  get print() : string {
    let toPrint = '';
    const header = 'date       | credit     | debit      | balance    | description';
    const line = '-----------|------------|------------|------------|------------';

    let balance = 0;

    this.transactions.sort((a, b) => a.date.getTime() - b.date.getTime()).forEach((transaction) => {
      const date = transaction.date.toLocaleDateString();
      const credit = transaction.to.id === this.account.id ? transaction.amount : 0;
      const debit = transaction.to.id !== this.account.id ? transaction.amount : 0;
      const { description } = transaction;
      balance += transaction.to.id === this.account.id ? transaction.amount : -transaction.amount;
      const txnLine = `${date} | ${credit.toFixed(2).padEnd(10)} | ${debit.toFixed(2).padEnd(10)} | ${balance.toFixed(2).padEnd(10)} | ${description.padEnd(10)}`;
      toPrint = `${txnLine}\n${toPrint}`;
    });

    return `${header}\n${line}\n${toPrint}${line}`;
  }
}

/* eslint-disable no-param-reassign */
import useBank from '../composables/useBank';
import Statement from '../statements/Statement';
import { Source } from '../transactions/Source.enum';
import StaticSources from '../transactions/StaticSources';
import Transaction from '../transactions/Transaction.model';
import UUID from '../utils/UUID';
import IAccount from './Account.model';

export default class Account implements IAccount {
  id: string;

  name: string;

  transactions: Transaction[];

  owner: string;

  source: Source;

  constructor(id: string, name: string, owner: string, transactions: Transaction[] = []) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.transactions = transactions;
    this.source = Source.ACCOUNT;
  }

  get ownerId(): string {
    return this.owner;
  }

  get balance(): number {
    let total = 0;
    this.transactions.forEach((transaction) => {
      if (transaction.from.id === this.id) {
        total -= transaction.amount;
      } else {
        total += transaction.amount;
      }
    });

    return total;
  }

  get statement() : Statement {
    return new Statement(this);
  }

  deposit(amount: number, date?: Date | string, description?: string) : Transaction {
    if (typeof date === 'string') {
      description = date;
      date = new Date();
    }

    if (description === undefined) description = 'External deposit';
    const t : Transaction = {
      id: UUID.forTransaction(),
      amount,
      from: StaticSources.DEPOSIT,
      to: this,
      date: date as Date,
      description,
    };
    this.transactions.push(t);
    return t;
  }

  withdraw(amount: number, date: Date = new Date()) : Transaction {
    if (this.balance < amount) throw new Error('Insufficient funds');
    const t = {
      id: UUID.forTransaction(), amount, from: this, to: StaticSources.WITHDRAWAL, date, description: 'Withdrawal at ATM',
    };
    this.transactions.push(t);
    return t;
  }

  transfer(amount: number, toId: string, description?: string) : Transaction {
    const user = useBank.getUser(this.ownerId);
    const to = useBank.getAccount(toId);

    if (!user || !to) throw new Error('User or Account not found');
    if (this.balance < amount) throw new Error('Insufficient funds');
    const transaction : Transaction = {
      id: UUID.forTransaction(),
      amount,
      from: this,
      to,
      date: new Date(),
      description: description || `Transfer to ${to.name}`,
    };
    this.transactions.push(transaction);
    to.transactions.push(transaction);
    return transaction;
  }
}

import Bank from "../Bank";
import { Source } from "../transactions/Source.enum";
import StaticSources from "../transactions/StaticSources";
import Transaction from "../transactions/Transaction.model";
import UUID from "../utils/UUID";
import IAccount from "./Account.model";

export default class Account implements IAccount {
  id: string;
  name: string;
  transactions: Transaction[];
  owner: string;
  source: Source;

  constructor(id: string, name: string, owner: string) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.transactions = [];
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

  deposit(amount: number) {

    this.transactions.push({ id: UUID.forTransaction(), amount, from: StaticSources.DEPOSIT, to: this });
  }

  transfer(amount: number, id: string) {
    // TODO : CHECK BALANCE
    const user = Bank.getInstance().getUser(this.ownerId);
    const to = Bank.getInstance().getAccount(id);

    if (user && to) {
      if (this.balance >= amount) {
        const transaction = {
          id: UUID.forTransaction(),
          amount: amount,
          from: this,
          to,
        };
        this.transactions.push(transaction);
        to.transactions.push(transaction);
      } else {
        throw new Error('Insufficient funds');
      }
    }else {
      throw new Error("User not found");
    }
  }
}

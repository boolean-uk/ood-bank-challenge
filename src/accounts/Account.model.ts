import Ownable from '../ownership/Ownbable.model';
import Statement from '../statements/Statement';
import Transaction from '../transactions/Transaction.model';
import TransactionSource from '../transactions/TransactionSource';

export default interface IAccount extends Ownable, TransactionSource {
  id: string;
  name: string;
  transactions: Array<Transaction>;

  deposit(amount: number, description: string): Transaction;
  deposit(amount: number, date: Date): Transaction;
  deposit(amount: number, date: Date, description: string): Transaction;

  withdraw(amount: number): Transaction;

  get balance(): number;

  get statement(): Statement;

  transfer(amount: number, to: string, description: string) : Transaction;

}

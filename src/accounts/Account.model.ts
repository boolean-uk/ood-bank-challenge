import Ownable from '../ownership/Ownbable.model';
import Transaction from '../transactions/Transaction.model';
import TransactionSource from '../transactions/TransactionSource';

export default interface IAccount extends Ownable, TransactionSource {
  id: string;
  name: string;
  transactions: Array<Transaction>;

}

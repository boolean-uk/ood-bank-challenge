import { Currency, Money } from "ts-money";
import Account from "./Account";
import AccountTypes from "./AccountTypes";
import { TransactionType } from "../Transaction.type";
import generateUUID from "../../utils/uuid";

export default class CheckingAccount extends Account {
	private _overdraft?: Money;

	constructor(currency: Currency, overdraft?: Money) {
		super(AccountTypes.CHECKING, currency);
		this._overdraft = overdraft;
	}

	withdraw(amount: Money) {
		if (!this._overdraft) return super.withdraw(amount);

		if (this.balance.add(this._overdraft).greaterThanOrEqual(amount)) {
			const date = new Date();
			this._transactions.set(date, {
				id: generateUUID(),
				date,
				amount,
				type: TransactionType.DEBIT,
			});
			return amount;
		} else throw new Error("Funds Unavailable");
	}
}

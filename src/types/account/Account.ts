//@ts-ignore
import { Currency, Money } from "ts-money";
import { Transaction, TransactionType } from "../Transaction.type";
import AccountTypes from "./AccountTypes";
import generateUUID from "../../utils/uuid";
import UUID from "../utils/UUID";

class Account {
	protected _id: UUID;
	protected _currency: Currency;
	protected _transactions: Map<Date, Transaction>;
	protected _type: AccountTypes;

	constructor(type: AccountTypes, currency: Currency) {
		this._id = generateUUID();
		this._transactions = new Map();
		this._currency = currency;
		this._type = type;
	}

	deposit(amount: Money) {
		const date = new Date();
		this._transactions.set(date, {
			id: generateUUID(),
			date,
			amount,
			type: TransactionType.CREDIT,
		});
	}

	withdraw(amount: Money) {
		if (this.balance.greaterThanOrEqual(amount)) {
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

	//======== GETTERS
	get id() {
		return this._id;
	}

	get currency() {
		return this._currency;
	}
	get type() {
		return this._type;
	}

	get balance(): Money {
		let balance = new Money(0, this._currency);
		this._transactions.forEach((transaction) => {
			balance =
				transaction.type === TransactionType.CREDIT
					? balance.add(transaction.amount)
					: balance.subtract(transaction.amount);
		});
		return balance;
	}
}

export default Account;

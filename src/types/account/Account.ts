//@ts-ignore
import { Currency, Money } from "ts-money";
import generateUUID from "../../utils/uuid";
import { Transaction, TransactionType } from "../Transaction.type";
import UUID from "../utils/UUID";
import AccountTypes from "./AccountTypes";

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

	deposit(amount: number) {
		const date = new Date();
		this._transactions.set(date, {
			id: generateUUID(),
			date,
			amount: new Money(amount, this._currency),
			type: TransactionType.CREDIT,
		});
	}

	withdraw(amount: number) {
		const money = new Money(amount, this._currency);
		if (this.balance.greaterThanOrEqual(money)) {
			const date = new Date();
			this._transactions.set(date, {
				id: generateUUID(),
				date,
				amount: money,
				type: TransactionType.DEBIT,
			});
			return money;
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
	get transactionHistory() {
		const history: Transaction[] = [];
		this._transactions.forEach((e) => history.push({ ...e }));
		return history;
	}
}

export default Account;

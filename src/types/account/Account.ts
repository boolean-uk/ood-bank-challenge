//@ts-ignore
import { Currencies, Currency, Money } from "ts-money";
import generateUUID from "../../utils/uuid";
import { Transaction, TransactionType } from "../Transaction.type";
import UUID from "../utils/UUID";
import AccountTypes from "./AccountTypes";
import { StatementParser } from "../utils/statement.parser";

class Account {
	protected _id: UUID;
	protected _currency: Currency;
	protected _transactions: Map<Date, Transaction>;
	protected _type: AccountTypes;
	protected _isOpen: boolean;

	constructor(type: AccountTypes, currency: Currency) {
		this._id = generateUUID();
		this._transactions = new Map();
		this._currency = currency;
		this._type = type;
		this._isOpen = true;
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

	close() {
		if (!this.canBeClosed()) return false;
		this._isOpen = false;
		return true;
	}

	canBeClosed() {
		if (this.balance.greaterThan(new Money(0, this._currency)))
			return false;
		else true;
	}

	getStatement<T>(
		parser: StatementParser<T>
		//period?: { start?: Date; end?: Date }
	) {
		const transactionsArr = [...this._transactions.values()].map((e) => ({
			...e,
		}));
		/*
		const startI = period?.start
				? transactionsArr.findIndex(
						(e) =>
							e.id ===
							this._transactions.get(period.start as Date)
				  )
				: 0,
			endI = period?.end
				? transactionsArr.findIndex(
						(e) =>
							e.id === this._transactions.get(period.end as Date)
				  )
				: transactionsArr.length - 1;

		*/
		return parser(transactionsArr, new Money(0, this._currency));
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

	get isOpen() {
		return this._isOpen;
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

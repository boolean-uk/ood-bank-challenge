import { Currencies, Currency, Money } from "ts-money";
import generateUUID from "../../utils/uuid";
import Account from "../account/Account";
import UUID from "../utils/UUID";
import AccountTypes from "../account/AccountTypes";

export default class Holder {
	private _accounts: Array<Account>;
	private _id: UUID;
	private _name: string;
	private _isActive: boolean;

	constructor(name: string) {
		this._name = name;
		this._id = generateUUID();
		this._accounts = [];
		this._isActive = true;
	}

	/**
	 * Deactivates the user and closes all accounts
	 */
	closeAll() {
		const accountState = this._accounts.map((e) => e.canBeClosed());

		if (accountState.every((e) => e)) {
			this._accounts.forEach((e) => e.close());
			this._isActive = false;
			return true;
		} else {
			return false;
		}
	}

	openAccount(type: AccountTypes, currency: Currency) {
		this._accounts.push(new Account(type, currency));
	}

	closeAccount(id: UUID) {
		const account = this.getAccount(id);
		if (!account) throw new Error("data not found while closing account");

		return account.close();
	}

	getAccount(id: UUID) {
		return this._accounts.find((e) => e.id === id);
	}

	get accountIds() {
		return this._accounts.map((e) => ({ type: e.type, id: e.id }));
	}
	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get isActive() {
		return this._isActive;
	}
}

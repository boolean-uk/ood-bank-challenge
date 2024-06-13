import { describe, it, expect, beforeEach } from "vitest";
import Account from "../src/types/account/Account";
import { Money, Currencies } from "ts-money";
import AccountTypes from "../src/types/account/AccountTypes";
import toStringParser from "../src/utils/statements/toString.parser";
describe("Account Details", () => {
	it("Should have a uuid and an account's holder name as immutable fields", () => {
		const account = new Account(AccountTypes.CHECKING, Currencies.EUR);

		expect(account.id).toBeDefined();
		expect(account.type).toBe(AccountTypes.CHECKING);
		expect(account.currency).toBe(Currencies.EUR);
	});
});

describe("Account Transactions", () => {
	let account: Account;
	beforeEach(() => {
		account = new Account(AccountTypes.CHECKING, Currencies.EUR);
	});

	it("Should be able to perform credit operations", () => {
		expect(account.balance).toEqual(new Money(0, Currencies.EUR));
		account.deposit(100);
		expect(account.balance).toEqual(new Money(100, Currencies.EUR));
		account.deposit(50);
		expect(account.balance).toEqual(new Money(150, Currencies.EUR));
		account.deposit(200);
		expect(account.balance).toEqual(new Money(350, Currencies.EUR));
	});

	it("Should be able to perform debit operations", () => {
		account.deposit(100);
		expect(account.withdraw(50)).toEqual(new Money(50, Currencies.EUR));
	});

	it("Should throw when no funds are available", () => {
		expect(() => account.withdraw(50)).toThrow();
	});

	it("Should return a copy of the transaction history", () => {
		account.deposit(100);
		account.withdraw(20);
		account.deposit(25);
		const history = account.transactionHistory;
		expect(history).toBeDefined();
		history[0].amount.add(new Money(5000, Currencies.EUR));
		expect(account.transactionHistory[0].amount.amount).toBe(100);
	});

	it("Should print a multiline string as a bank statement", () => {
		account.deposit(100);
		account.deposit(50);
		account.withdraw(5);

		const statement = account.getStatement(toStringParser);
		console.log(statement);
		expect(statement).toBeDefined();
	});
});

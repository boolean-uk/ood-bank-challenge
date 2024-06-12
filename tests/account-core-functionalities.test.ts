import { describe, it, expect, beforeEach } from "vitest";
import Account from "../src/types/account/Account";
import { Money, Currencies } from "ts-money";
import AccountTypes from "../src/types/account/AccountTypes";

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
		account.deposit(new Money(100, Currencies.EUR));
		expect(account.balance).toEqual(new Money(100, Currencies.EUR));
		account.deposit(new Money(50, Currencies.EUR));
		expect(account.balance).toEqual(new Money(150, Currencies.EUR));
		account.deposit(new Money(200, Currencies.EUR));
		expect(account.balance).toEqual(new Money(350, Currencies.EUR));
	});

	it("Should be able to perform debit operations", () => {
		account.deposit(new Money(100, Currencies.EUR));
		expect(account.withdraw(new Money(50, Currencies.EUR))).toEqual(
			new Money(50, Currencies.EUR)
		);
	});

	it("Should throw when no funds are available", () => {
		expect(() => account.withdraw(new Money(50, Currencies.EUR))).toThrow();
	});

});

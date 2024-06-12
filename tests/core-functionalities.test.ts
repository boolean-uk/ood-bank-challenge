import { describe, it, expect } from "vitest";
import Account from "../src/types/Account";

describe("Account Details", () => {
	it("Should have a uuid and an account's holder name as immutable fields", () => {
		const account = new Account("Rafa");

		expect(account.name).toBe("Rafa");
		expect(account.id).toBeDefined();

		expect(() => (account.name = "John")).toThrow();
		expect(() => (account.id = "John")).toThrow();
	});
});

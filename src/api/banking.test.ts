// backend.test.ts
import { bankingInstance } from "./banking.ts";

describe("Banking API", () => {
    beforeEach(() => {
        bankingInstance["balance"] = 0;
    });

    it("should return the initial balance of 0", () => {
        expect(bankingInstance.getBalance()).toBe(0);
    });

    it("should deposit funds correctly", () => {
        bankingInstance.deposit(100);
        expect(bankingInstance.getBalance()).toBe(100);
    });

    it("should not deposit negative funds", () => {
        bankingInstance.deposit(-50);
        expect(bankingInstance.getBalance()).toBe(0);
    });

    it("should withdraw funds correctly", () => {
        bankingInstance.deposit(200);
        bankingInstance.withdraw(50);
        expect(bankingInstance.getBalance()).toBe(150);
    });

    it("should not withdraw funds greater than the balance", () => {
        bankingInstance.deposit(50);
        bankingInstance.withdraw(100);
        expect(bankingInstance.getBalance()).toBe(50);
    });
});

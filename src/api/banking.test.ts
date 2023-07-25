import { Banking } from "./banking";

describe("Banking API", () => {
    let bankingInstance: Banking;

    beforeEach(() => {
        bankingInstance = new Banking();
    });

    it("should return the initial balance of 100", () => {
        expect(bankingInstance.getBalance()).toBe(100);
    });

    it("should deposit funds correctly", () => {
        bankingInstance.deposit(100);
        expect(bankingInstance.getBalance()).toBe(200);
    });

    it("should not deposit negative funds", () => {
        bankingInstance.deposit(-50);
        expect(bankingInstance.getBalance()).toBe(100);
    });

    it("should withdraw funds correctly", () => {
        bankingInstance.deposit(200);
        bankingInstance.withdraw(50);
        expect(bankingInstance.getBalance()).toBe(250);
    });

    it("should not withdraw funds greater than the balance", () => {
        bankingInstance.deposit(50);
        bankingInstance.withdraw(200);
        expect(bankingInstance.getBalance()).toBe(150);
    });
});
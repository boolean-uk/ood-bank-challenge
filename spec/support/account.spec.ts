import "jasmine";
import Account from "../../src/account"
describe("something", () => {
    let account: Account

    beforeEach(() => {
        account = new Account()
    })

    it("should deposit money", () => {
        let result: boolean = account.deposit(420, new Date())
        expect(result).toBe(true);
    });

    it("should not deposit incorrect amount of money", () => {
        let result: boolean = account.deposit(-420, new Date())
        expect(result).toBe(false);
    });
});
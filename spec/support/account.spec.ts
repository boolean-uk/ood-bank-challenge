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

    it("should withdraw money", () => {
        account.deposit(1000, new Date())
        let result: boolean = account.withdraw(100, new Date())

        expect(result).toBe(true);
    });


    it("should not withdraw money when there is not enough money on the account", () => {
        account.deposit(100, new Date())
        let result: boolean = account.withdraw(1000, new Date())

        expect(result).toBe(false);
    });

    it("should print bank statement", () => {
        account.deposit(400, new Date(2023, 7, 25))
        account.withdraw(300, new Date(2023, 7, 25))

        const expectedResult: string[] = []
        let actualResult: string = account.printStatement()

        expectedResult.push("date       || credit  || debit  || balance\n");
        expectedResult.push("7/25/2023  || 400     ||        || 400\n");
        expectedResult.push("2/10/2012  ||         ||  300   || 100\n");

        expect(actualResult).toBe(expectedResult.join(""));
    });
});
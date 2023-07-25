import "jasmine"
import BankAccount from "../../src/BankAccount"

describe("Testing", () => {
    let bankAccount: BankAccount

    beforeEach(() => {
        bankAccount = new BankAccount()
    })

    it("should return true", () => {
        let result: boolean = bankAccount.deposit(100, new Date())

        expect(result).toBe(true)
    })

    it("negative amount should return false", () => {
        let result: boolean = bankAccount.deposit(-1000, new Date())

        expect(result).toBe(false);
    });

    it("should allow deposit of zero", () => {
        let result: boolean = bankAccount.deposit(0, new Date())
        expect(result).toBe(false)
    })

    it("should allow deposit on current date", () => {
        let result: boolean = bankAccount.deposit(1000, new Date())
        expect(result).toBe(true)
    })


    it("should return true", () => {
        bankAccount.deposit(1000, new Date())
        let result: boolean = bankAccount.withdraw(1000, new Date())

        expect(result).toBe(true);
    });


    it("withdraw amount too high should return false", () => {
        bankAccount.deposit(1000, new Date())
        let result: boolean = bankAccount.withdraw(1100, new Date())

        expect(result).toBe(false);
    });

    
    it("should allow withdrawal of zero", () => {
        let result: boolean = bankAccount.withdraw(0, new Date())
        expect(result).toBe(false)
    })

    it("should allow withdrawal on current date if balance is enough", () => {
        bankAccount.deposit(1000, new Date())
        let result: boolean = bankAccount.withdraw(500, new Date())
        expect(result).toBe(true)
    })

    it("should not allow withdrawal that exceeds balance without overdraft", () => {
        bankAccount.deposit(500, new Date())
        let result: boolean = bankAccount.withdraw(1000, new Date())
        expect(result).toBe(false)
    })

    
    it("should allow withdrawal that exceeds balance with overdraft", () => {
        bankAccount.deposit(500, new Date())
        bankAccount.enableOverDraft()
        let result: boolean = bankAccount.withdraw(1000, new Date())
        expect(result).toBe(true)
    })

    it("should return account history", () => {
        bankAccount.deposit(1000, new Date(2012, 1, 14))
        bankAccount.deposit(2000, new Date(2012, 1, 13))
        bankAccount.withdraw(500, new Date(2012, 1, 10))

        let result: string = bankAccount.showAccountHistory()
        const expected: string[] = []
        expected.push("date       || credit  || debit  || balance\n");
        expected.push("2/14/2012  || 1000    ||        || 1000\n");
        expected.push("2/13/2012  || 2000    ||        || 3000\n");
        expected.push("2/10/2012  ||         || -500   || 2500\n");

        expect(result).toBe(expected.join(""));
    });

    it("should return account history between two dates", () => {
        bankAccount.deposit(1000, new Date(2012, 1, 14))
        bankAccount.deposit(2000, new Date(2012, 1, 13))
        bankAccount.withdraw(500, new Date(2012, 1, 10))

        const date1: Date = new Date(2012, 1, 9)
        const date2: Date = new Date(2012, 1, 12)
        let result: string = bankAccount.showAccountHistoryBetweenTwoDates(date1, date2)
        const expected: string[] = []
        expected.push("date       || credit  || debit  || balance\n");
        expected.push("2/10/2012  ||         || -500   || 2500\n");

        expect(result).toBe(expected.join(""));
    });

    it("when first date is grater than second date should return proper message", () => {
        bankAccount.deposit(1000, new Date())
        bankAccount.enableOverDraft()

        let result: boolean = bankAccount.withdraw(1500, new Date())

        expect(result).toBe(true);
    });

    it("when allow overdraft should be able to borrow money", () => {
        const date1: Date = new Date(2012, 1, 9)
        const date2: Date = new Date(2012, 1, 12)
        let result: string = bankAccount.showAccountHistoryBetweenTwoDates(date2, date1)

        expect(result).toBe("Wrong dates");
    });
    
});

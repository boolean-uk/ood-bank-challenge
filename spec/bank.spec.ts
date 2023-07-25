import { Bank } from "../bank"
import { Bank_Transaction } from "../bankTransaction"

describe("Bank tests", () => {
    let bank: Bank

    beforeEach(() => { 
        bank = new Bank()
    })

    it("should not add funds, funds number is negatice", () => {
        expect(() => bank.addFunds(-100)).toThrowError("Funds number cannot be negative");
    })

    it("should add funds, funds number is positive", () => {
        const fundsToAdd = 100
        bank.addFunds(fundsToAdd);
        expect(bank.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 600", () => {
        const fundsToAdd = 600
        bank.addFunds(fundsToAdd);
        expect(bank.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 0", () => {
        expect(bank.getBalance()).toBe(0);
    })

    it("should not get funds, balance after transaction would be negative", () => {
        expect(() => bank.getFunds(100)).toThrowError("Balance after transaction would be negative");
    })

    it("should get funds, balance after transaction would be positive", () => {
        const fundsToAdd = 100
        const fundsToGet = 50
        bank.addFunds(fundsToAdd);
        bank.getFunds(fundsToGet);
        expect(bank.getBalance()).toBe(fundsToAdd - fundsToGet);
    })

    it("should return only transactions between chosen time period", () => {
        const startDate = new Date(2023, 1, 1)
        const endDate = new Date(2023, 3, 25)
        const bankTransactionsList : Array<Bank_Transaction> = [
            new Bank_Transaction(new Date(2022,1,2), "credit", 100),
            new Bank_Transaction(new Date(2023,1,20), "debit", 50),
            new Bank_Transaction(new Date(2023,3,24), "credit", 200),
            new Bank_Transaction(new Date(2023,3,26), "debit", 150),
            new Bank_Transaction(new Date(2023,2,26), "debit", 150)
        ]

        bank.bankTransactionsList = bankTransactionsList;
        const bankTransactionsListByTimePeriod = bank.createTransactionListBetweenTimePeriod(startDate, endDate);

        const expectedTransactions = [
            new Bank_Transaction(new Date(2023, 1, 20), "debit", 50),
            new Bank_Transaction(new Date(2023, 3, 24), "credit", 200),
            new Bank_Transaction(new Date(2023, 2, 26), "debit", 150),
          ];
      
        expect(bankTransactionsListByTimePeriod).toEqual(expectedTransactions);
    });
})
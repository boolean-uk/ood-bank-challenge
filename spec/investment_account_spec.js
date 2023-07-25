"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const investment_account_1 = require("../src/investment_account");
describe('InvestmentAccount', function () {
    // Mock the creation date for testing
    let creationDate;
    let account;
    beforeEach(() => {
        creationDate = new Date(2022, 0, 1);
        account = new investment_account_1.InvestmentAccount(creationDate);
    });
    it('getBalance calculates balance with interest correctly', function () {
        account.deposit(1000);
        const now = new Date();
        // scenario 1
        let expectedBalance = 1040;
        now.setFullYear(2022, 2, 1); // March 1, 2022    
        let actualBalance = account.getBalance(now);
        expect(actualBalance).toEqual(expectedBalance);
        // scenario 2
        expectedBalance = 1280;
        now.setFullYear(2023, 2, 1); // March 1, 2023    
        actualBalance = account.getBalance(now);
        expect(actualBalance).toEqual(expectedBalance);
    });
});

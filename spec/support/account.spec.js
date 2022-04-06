const Account = require("../../src/account");

describe("Bank challenge", () => {
    it("Given a account account with deposits and withdrawals, check balance", () => {
        // set up
        const account = new Account();

        // execute
        account.credit(3000);
        account.debit(500);
        account.credit(2000);
        account.credit(1000);

        const expectedBalance = 5500;

        const resultBalance =
            account.transactions[account.transactions.length - 1].balance;

        expect(resultBalance).toEqual(expectedBalance);
    });

    describe("deposit", () => {
        it("Returns value after several deposits", () => {
            const account = new Account();

            account.credit(1000, "10-01-2021");
            account.credit(1000, "10-01-2021");
            account.credit(1000, "10-01-2021");

            const expected = 3000;

            const result =
                account.transactions[account.transactions.length - 1].balance;

            expect(result).toEqual(expected);
        });
    });
});
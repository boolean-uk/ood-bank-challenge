const Account = require("../../src/account");
const Receipt = require("../../src/receipt");

describe("Receipt", () => {
    it("Prints a receipt from the transactions array", () => {
        // set up
        const account = new Account();

        // execute
        account.credit(3000);
        account.debit(500);
        account.credit(2000);
        account.credit(1000);

        const expected = `
        date       || credit  || debit  || balance\n
        14/01/2012 ||         || 500.00 || 2500.00\n
        13/01/2012 || 2000.00 ||        || 4500.00\n
        10/01/2012 || 1000.00 ||        || 5500.00
        `;

        result = account.statement();

        expect(result).toEqual(expected);
    });
});
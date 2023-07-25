"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bank_1 = require("../src/Bank");
describe("Bank tests", function () {
    var bank = new Bank_1.Bank();
    bank.transaction(1000, true);
    bank.transaction(2000, true);
    bank.transaction(500, false);
    it("increases amount of money on account by 1000", function () {
        var referedBalance = 1000;
        expect(bank.balanceAfterEachTransaction(0)).toEqual(referedBalance);
    });
    it("increases amount of money on account from 1000 to 3000", function () {
        var referedBalance = 3000;
        expect(bank.balanceAfterEachTransaction(1)).toEqual(referedBalance);
    });
    it("decreases amount of money on account by 500 - from 3000 to 2500", function () {
        var referedBalance = 2500;
        expect(bank.balanceAfterEachTransaction(2)).toEqual(referedBalance);
    });
});

import BankAccount from "../src/BankAccount"
import Transaction from "../src/Transaction"

describe('BankAccount', () => {
    let bankAccount: BankAccount;
    
    beforeEach(() => {
        bankAccount = new BankAccount();
    });

    it('should have a balance of 0', () => {
        expect(bankAccount.balance).toEqual(0);
    });

    it('should have a balance of 100 when depositing 100', () => {
        bankAccount.deposit(100);
        expect(bankAccount.balance).toEqual(100);
    });

});
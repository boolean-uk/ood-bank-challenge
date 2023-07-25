import { Account } from "../src"

describe('account tests', () => {
    let account: Account

    beforeEach(() => {
        account = new Account()
        
    })

    it('should return true and update balance after deposit certain amount of money', () => {
        const depositAmount = 1000;

        const depositResult = account.deposit(depositAmount);
        const balanceResult = account.getBalance();

        expect(depositResult).toEqual(true);
        expect(balanceResult).toEqual(depositAmount);
    })

    it('should return false and not update balance after deposit invalid amount of money', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = -500;

        account.deposit(depositAmount1);
        const depositResult = account.deposit(depositAmount2);
        const balanceResult = account.getBalance();

        expect(depositResult).toEqual(false);
        expect(balanceResult).toEqual(depositAmount1);
    })

    it('should return true and update balance after withdraw specific amount of money', () => {
        const depositAmount = 1000;
        const withdrawAmount = 500;
        const expectedBalance = depositAmount - withdrawAmount

        account.deposit(depositAmount);
        const withdrawResult = account.withdraw(withdrawAmount);
        const balanceResult = account.getBalance();

        expect(withdrawResult).toEqual(true);
        expect(balanceResult).toEqual(expectedBalance);
    })
})
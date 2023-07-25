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

    it('should return false and not update balance after withdraw invalid amount of money', () => {
        const depositAmount = 1000;
        const withdrawAmount = -500;

        account.deposit(depositAmount);
        const withdrawResult = account.withdraw(withdrawAmount);
        const balanceResult = account.getBalance();

        expect(withdrawResult).toEqual(false);
        expect(balanceResult).toEqual(depositAmount);
    })

    it('should return false and not update balance after trying withdraw amount > balance', () => {
        const depositAmount = 1000;
        const withdrawAmount1 = 200;
        const withdrawAmount2 = 801;
        const expectedBalance = depositAmount - withdrawAmount1

        account.deposit(depositAmount);
        account.withdraw(withdrawAmount1);
        const withdrawResult = account.withdraw(withdrawAmount2);
        const balanceResult = account.getBalance();

        expect(withdrawResult).toEqual(false);
        expect(balanceResult).toEqual(expectedBalance);
    })

    it('should return generated statement', () => {
        const depositAmount1 = 1000;
        const depositAmount2 = 2000;
        const withdrawAmount = 500;

        const actualDate = new Date();
        const day = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const month = actualDate.getDay() > 9 ? actualDate.getDay() : `0${actualDate.getDay()}`
        const year = actualDate.getFullYear()

        let expectedStatement = `date       || credit  || debit  || balance\n`
        expectedStatement += `${day}/${month}/${year} ||         || 500.00 || 2500.00\n`
        expectedStatement += `${day}/${month}/${year} || 2000.00 ||        || 3000.00\n`
        expectedStatement += `${day}/${month}/${year} || 1000.00 ||        || 1000.00`

        account.deposit(depositAmount1);
        account.deposit(depositAmount2);
        account.withdraw(withdrawAmount);

        const generatedStatement = account.generateStatement();

        expect(generatedStatement).toEqual(expectedStatement);
    })
})
describe('account tests', () => {
    let account

    beforeEach(() => {
        account = new Account();
    })

    it('should return true and update balance after deposit certain amount of money', () => {
        const depositAmount = 1000;

        const depositResult = account.deposit(depositAmount);
        const balanceResult = account.getBalance();

        expect(depositResult).toEqual(true);
        expect(balanceResult).toEqual(depositAmount);
    })
})
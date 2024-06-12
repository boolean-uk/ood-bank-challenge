import BankingSystem from '../src/BankingSystem.js'

describe('Banking System', () => {
    let client

    beforeEach(() => {
        client = new BankingSystem()
    })

    it('should make a deposite', () => {
        let expected = `date                 || `
        expected += `credit               || `
        expected += `debit                || `
        expected += `balance             \n`
        expected += `Wed Jun 12 2024      || `
        expected += `50.00                || `
        expected += `                     || `
        expected += `50.00               \n`
        client.deposit(50)
        expect(client.printBankStatement()).toEqual(expected)
    })

    it('should make a withdraw', () => {
        let expected = `date                 || `
        expected += `credit               || `
        expected += `debit                || `
        expected += `balance             \n`
        expected += `Wed Jun 12 2024      || `
        expected += `                     || `
        expected += `25.00                || `
        expected += `25.00               \n`
        expected += `Wed Jun 12 2024      || `
        expected += `50.00                || `
        expected += `                     || `
        expected += `50.00               \n`
        client.deposit(50)
        client.withdraw(25)
        expect(client.printBankStatement()).toEqual(expected)
    })

    it('should print bank statement', () => {
        let expected = `date                 || `
        expected += `credit               || `
        expected += `debit                || `
        expected += `balance             \n`
        expected += `Wed Jun 12 2024      || `
        expected += `100.00               || `
        expected += `                     || `
        expected += `125.00              \n`
        expected += `Wed Jun 12 2024      || `
        expected += `                     || `
        expected += `25.00                || `
        expected += `25.00               \n`
        expected += `Wed Jun 12 2024      || `
        expected += `50.00                || `
        expected += `                     || `
        expected += `50.00               \n`
        client.deposit(50)
        client.withdraw(25)
        client.deposit(100)
        expect(client.printBankStatement()).toEqual(expected)
        console.log(`\n${expected}`)
    })
})

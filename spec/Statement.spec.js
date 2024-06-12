import { Statement } from "../src/Statement.js"
import { Transaction } from "../src/Transaction.js"

describe('Statement', () => {
    it('should format statement correctly', () => {
        const transactions = [
            new Transaction('10/01/2012', 100000, 'credit', 100000),
            new Transaction('13/01/2012', 200000, 'credit', 300000),
            new Transaction('14/01/2012', 50000, 'debit', 250000)
        ]
        const statement = new Statement(transactions)
        const formattedStatement = statement.formatStatement()
        expect(formattedStatement).toContain('14/01/2012 ||        || 500.00 || 2500.00')
        expect(formattedStatement).toContain('13/01/2012 || 2000.00 ||        || 3000.00')
        expect(formattedStatement).toContain('10/01/2012 || 1000.00 ||        || 1000.00')
    })

    it('should format empty statement correctly', () => {
        const transactions = []
        const statement = new Statement(transactions)
        const formattedStatement = statement.formatStatement()
        expect(formattedStatement).toBe('')
    })
    
    it('should format single debit transaction correctly', () => {
        const transactions = [
            new Transaction('10/01/2012', 50000, 'debit', 50000),
        ]
        const statement = new Statement(transactions)
        const formattedStatement = statement.formatStatement()
        expect(formattedStatement).toBe('10/01/2012 ||        || 500.00 || 500.00')
    })
    
    it('should format single credit transaction correctly', () => {
        const transactions = [
            new Transaction('10/01/2012', 100000, 'credit', 100000),
        ]
        const statement = new Statement(transactions)
        const formattedStatement = statement.formatStatement()
        expect(formattedStatement).toBe('10/01/2012 || 1000.00 ||        || 1000.00')
    })
})

const Transactions = require('../src/Transactions.js')

/*
- Creates a Transaction class with list of transactions and balance (default to 0).
- Can create a new transaction using an instance of the Transaction class, and save it to the list of transactions.
- Can print a formatted list of transactions, using an instance of the Statement class.
*/

describe('Transactions Class', () => {
  let TransactionsManager
  beforeEach(() => {
    TransactionsManager = new Transactions()
  })

  it('Creates a Transaction class with list of transactions and balance (default to 0)', () => {
    expect(TransactionsManager).toBeInstanceOf(Transactions)
    expect(TransactionsManager.balance).toBe(0)
  })

  it('Can create a new transaction using an instance of the Transaction class, and save it to the list of transactions.', () => {
    TransactionsManager.newTransaction(1000)
    expect(TransactionsManager.balance).toBe(1000)
    expect(TransactionsManager.listOfTransactions.length).toBe(1)
  })




})

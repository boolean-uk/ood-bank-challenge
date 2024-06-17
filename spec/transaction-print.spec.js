import { BankAccount } from "../src/bank-account.js"
import { TransactionsPrint } from "../src/transactions-print.js"

describe('transactionPrin', () => {
  let printer

  beforeEach(() => {
    printer = new TransactionsPrint
  })

  it('should be instance of Class', () => {
    expect(printer).toBeInstanceOf(TransactionsPrint)
  })

  it('should print Exactly the same: ', () => {
    const myBankAccount = new BankAccount
    myBankAccount.deposit(1000, '10-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.withdraw(1500, '10-01-2012')
    const myTransactions = myBankAccount.getTransactions
    expect(printer.print(myTransactions)).toEqual([ 'date       ||  credit ||  debit   || balance  ',
       '17/06/2024 || 1000.00 ||          || 1000.00 ',
        '17/06/2024 ||  500.00 ||          || 1500.00 ',
        '17/06/2024 ||  500.00 ||          || 2000.00 ',
         '17/06/2024 ||         || 1500.00  ||  500.00 ' ])
  })
})
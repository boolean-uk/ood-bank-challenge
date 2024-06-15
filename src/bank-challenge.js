class Transaction {
  constructor(date, amount) {
    this._date = date
    this._amount = amount
  }

  getAmount() {
    return this._amount
  }

  formatDate() {
    if (this._date instanceof Date) {
      const day = this._date.getDate()
      const month = this._date.getMonth() + 1
      const year = this._date.getFullYear()
      return `${day}/${month}/${year}`
    } else {
      return ''
    }
  }
}

class CreditTransaction extends Transaction {
  constructor(date, amount) {
    super(date, amount)
  }

  get credit() {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    }).format(this.getAmount())
  }

  get debit() {
    return undefined
  }
}

class DebitTransaction extends Transaction {
  constructor(date, amount) {
    super(date, amount)
  }

  get debit() {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    }).format(this.getAmount())
  }

  get credit() {
    return undefined
  }
}

class Account {
  constructor(accountNumber) {
    this._accountNumber = accountNumber
    this._transactions = []
  }

  getAccountNumber() {
    return this._accountNumber
  }

  getBalance() {
    let balance = 0

    for (const transaction of this._transactions) {
      if (transaction instanceof CreditTransaction) {
        balance += transaction.getAmount()
      } else if (transaction instanceof DebitTransaction) {
        balance -= transaction.getAmount()
      }
    }

    return balance
  }

  addTransaction(transaction) {
    this._transactions.push(transaction)
  }

  getTransactions() {
    return this._transactions
  }
}

class Bank {
  constructor() {
    this._accounts = []
  }

  createAccount(accountNumber) {
    const account = new Account(accountNumber)
    this._accounts.push(account)
    return account
  }

  deposit(accountNumber, amount, date) {
    const account = this.findAccount(accountNumber)
    if (account) {
      const transaction = new CreditTransaction(this.parseDate(date), amount)
      account.addTransaction(transaction)
    } else {
      console.log(`Account ${accountNumber} not found.`)
    }
  }

  withdraw(accountNumber, amount, date) {
    const account = this.findAccount(accountNumber)
    if (account) {
      const balance = account.getBalance()
      if (balance >= amount) {
        const transaction = new DebitTransaction(this.parseDate(date), amount)
        account.addTransaction(transaction)
      } else {
        console.log('Insufficient balance.')
      }
    } else {
      console.log(`Account ${accountNumber} not found.`)
    }
  }

  parseDate(dateString) {
    const [day, month, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

  findAccount(accountNumber) {
    return this._accounts.find((account) => account.getAccountNumber() === accountNumber)
  }

  printStatement(accountNumber) {
    const account = this.findAccount(accountNumber)
    if (account) {
      const transactions = account.getTransactions()

      console.log('date\t\t|| credit\t|| debit\t|| balance')

      let balance = 0
      for (const transaction of transactions) {
        const transactionDate = transaction.formatDate()

        if (transaction instanceof CreditTransaction) {
          balance += transaction.getAmount()
          console.log(
            `${transactionDate}\t\t|| ${transaction.credit}\t|| \t\t|| ${new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'USD',
            }).format(balance)}`
          )
        } else if (transaction instanceof DebitTransaction) {
          balance -= transaction.getAmount()
          console.log(
            `${transactionDate}\t\t|| \t\t|| ${transaction.debit}\t|| ${new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'USD',
            }).format(balance)}`
          )
        }
      }
    } else {
      console.log(`Account ${accountNumber} not found.`)
    }
    console.log('')
    console.log('')
  }
}
  
const bank = new Bank()
const accountNumber = 123456789
  
bank.createAccount(accountNumber)
bank.deposit(accountNumber, 10, '10/01/2012')
bank.withdraw(accountNumber, 5, '10/01/2012')
bank.deposit(accountNumber, 25, '15/01/2012')
bank.withdraw(accountNumber, 5, '15/01/2012')
bank.printStatement(accountNumber)
bank.createAccount(2345)
bank.deposit(2345, 15, '18/06/2020')
bank.withdraw(2345, 5, '18/06/2020')
bank.deposit(2345, 10, '19/06/2020')
bank.printStatement(2345)


module.exports = {
  Bank,
  Account,
  Transaction,
  CreditTransaction,
  DebitTransaction,
}

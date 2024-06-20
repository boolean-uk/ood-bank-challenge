class Transaction {
  constructor(date, amount) {
    this.date = date
    this.amount = amount
  }

  getAmount() {
    return this.amount
  }

  formatDate() {
    if (this.date instanceof Date) {
      const day = this.date.getDate()
      const month = this.date.getMonth() + 1
      const year = this.date.getFullYear()
      return `${day}/0${month}/${year}`
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
      currency: 'GBP',
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
      currency: 'GBP',
    }).format(this.getAmount())
  }

  get credit() {
    return undefined
  }
}

class Account {
  constructor(accountNumber) {
    this.accountNumber = accountNumber
    this.transactions = []
  }

  getAccountNumber() {
    return this.accountNumber
  }

  getBalance() {
    let balance = 0

    for (const transaction of this.transactions) {
      if (transaction instanceof CreditTransaction) {
        balance += transaction.getAmount()
      } else if (transaction instanceof DebitTransaction) {
        balance -= transaction.getAmount()
      }
    }

    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

  getTransactions() {
    return this.transactions
  }
}

class Bank {
  constructor() {
    this.accounts = []
  }

  createAccount(accountNumber) {
    const account = new Account(accountNumber)
    this.accounts.push(account)
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
    return this.accounts.find((account) => account.getAccountNumber() === accountNumber)
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
              currency: 'GBP',
            }).format(balance)}`
          )
        } else if (transaction instanceof DebitTransaction) {
          balance -= transaction.getAmount()
          console.log(
            `${transactionDate}\t\t|| \t\t|| ${transaction.debit}\t|| ${new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'GBP',
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
bank.withdraw(accountNumber, 5, '14/01/2012')
bank.printStatement(accountNumber)
bank.createAccount(2345)
bank.deposit(2345, 1500, '18/06/2020')
bank.withdraw(2345, 500, '18/06/2020')
bank.deposit(2345, 1000, '19/06/2020')
bank.printStatement(2345)

bank.createAccount(23456)
bank.deposit(23456, 1500, '18/06/2020')
bank.withdraw(23456, 500, '18/06/2020')
bank.deposit(23456, 1000, '19/06/2020')
bank.printStatement(23456)


module.exports = {
  Bank,
  Account,
  Transaction,
  CreditTransaction,
  DebitTransaction,
}

import numeral from "numeral";

class Statement {
    constructor(account, startDate, endDate) {
      this.accountInfo = {
        accountHolder: account.accountHolder,
        accountNumber: account.accountNumber,
      };
      this.transactions = account.getTransactions(startDate, endDate);
      this.closingBalance = numeral(account.balance).format("0.00")
    }
  
    get console() {
      console.log (
      `Account Holder: ${this.accountInfo.accountHolder}\nAccount Number: ${this.accountInfo.accountNumber}\n `)
      
      this.transactions.forEach((transaction) => {
          console.log(`${transaction.date} || ${transaction.constructor.name} || Amount: £${transaction.amount} || Balance after transaction: £${transaction.balanceAfterTransaction} `)
      })
      console.log(`Closing balance for period: £${this.closingBalance}`)
    }
  
    get json() {
      return JSON.stringify(this)
    }
  }

  export { Statement }
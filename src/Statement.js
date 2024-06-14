import numeral from "numeral";
import PuppeteerHTMLPDF from "puppeteer-html-pdf";

class Statement {
    constructor(account, startDate, endDate) {
      this.accountInfo = {
        accountHolder: account.accountHolder,
        accountNumber: account.accountNumber,
      };
      this.transactions = account.getTransactions(startDate, endDate);
      this.closingBalance = numeral(account.balance).format('0.00')
    }
  
    get console() {
      console.log (
      `Account Holder: ${this.accountInfo.accountHolder}\nAccount Number: ${this.accountInfo.accountNumber}\n `)
      
      this.transactions.forEach((transaction) => {
          console.log(`${transaction.date} || ${transaction.constructor.name} || Amount: £${transaction.amount} || Balance after transaction: £${transaction.balanceAfterTransaction} `)
      })
      console.log(`Account balance: £${this.closingBalance}`)
      if (account.overdraft) {
        console.log(`Overdraft: ${account.overdraft}`)
      }
    }
  
    get json() {
      return JSON.stringify(this)
    }

    async getPDF() {
      const newPDF = new PuppeteerHTMLPDF();
      newPDF.setOptions({format: "A4", path: `/Users/willbaxter/Desktop/Boolean/ood-bank-challenge/src/${new Date()}`})

      let content = `<h1>Account Statement</h1><br />`
      content += `<p>Account Holder: ${this.accountInfo.accountHolder}</p><br /><p>Account Number: ${this.accountInfo.accountNumber}</p><br />`

      this.transactions.forEach((transaction) => {
       content += `<p>${transaction.date} || ${transaction.constructor.name} || Amount: £${transaction.amount} || Balance after transaction: £${transaction.balanceAfterTransaction}</p>`
    })
      content += `<p>Account balance: £${this.closingBalance}</p>`

      try {
        await newPDF.create(content)
      } catch(error){
        console.log('HTML maker encountered an issue')
      }
    }
  }

  export { Statement }
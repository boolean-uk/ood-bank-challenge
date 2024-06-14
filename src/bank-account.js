import { DateProvider } from "./date.js"
import { Transaction } from "./transaction.js"
class BankAccount {
  constructor() {
    this.transaction = []
    this.balance = '0.00'
    this.date = new DateProvider
  }

  
  deposit(value) {
    const amount = parseFloat(value).toFixed(2)
    // console.log(amount)
    const date = this.date.currentDate()
    this.balance = this.calculeDepositString(this.balance, amount)
    console.log(this.balance)
    this.transaction.push(new Transaction(amount, date, 'credit', this.balance))
  }

  withdraw(value) {
    const amount = parseFloat(value).toFixed(2)
    if((this.balance - amount) < 0) {
      return 'You dont have enough money!'
    }
    const date = this.date.currentDate()
    this.balance = this.calculeWithdrawString(this.balance, amount)
    this.transaction.push(new Transaction(amount, date, 'debit', this.balance))
  }

  get getTransactions() {
    return this.transaction
  }

  get getBalance() {
    return this.balance
  }

  calculeDepositString(a, b){
    const [aInt , aDec = '00'] = a.split('.')
    const [bInt , bDec = '00'] = b.split('.')
    const intSum = parseInt(aInt) + parseInt(bInt)
    const decSum = parseInt(aDec) + parseInt(bDec)
    // const adjustedDecSum = decSum.toString().padStart(2, '0')
    const carry = Math.floor(decSum / 100)
    const finalIntSum = intSum + carry
    const finalDecSum = (decSum % 100).toString().padStart(2, '0')
    return `${finalIntSum}.${finalDecSum}`
  }

  calculeWithdrawString(a, b){
    let value1 = a
    let value2 = b
    let value3 = b
    if(value1 < value2) {
      value2 = value1
      value1 = value3
    }
    console.log(a, 'test',b)
    const [aInt , aDec = '00'] = value1.split('.')
    const [bInt , bDec = '00'] = value2.split('.')
    console.log(aInt, 't', aDec, 'c', bInt, 'ccc', bDec)
    const intDiff = parseInt(aInt) - parseInt(bInt)
    const decDiff = parseInt(aDec) - parseInt(bDec)
    return `${intDiff}.${decDiff.toString().padStart(2, '0')}`
  }
}


export { BankAccount }
import { NormalAccount,Transaction, } from "../src/bank";
describe("Normal account tests",()=>
{
    let normalAccount:NormalAccount

    beforeEach(()=> {
        normalAccount = new NormalAccount()
    })

    it("should create normal account with balance at 0 and empty transactions list",() =>
    {
        expect(normalAccount.balance).toEqual(0)
        expect(normalAccount.transactions.length).toEqual(0)
    })
    it("should deposit amount to balance", () =>{

        normalAccount.deposit(100)
        expect(normalAccount.balance).toEqual(100)

    })
    it("should not deposit amount to balance - wrong data provided", () =>{

      normalAccount.deposit(-100)
      expect(normalAccount.balance).toEqual(0)

  })

  it("should withdraw from account", () =>{

    normalAccount.deposit(200)
    normalAccount.withdraw(100)
    expect(normalAccount.balance).toEqual(100)

})

it("should not withdraw from account - user wants to withdraw too much", () =>{

  normalAccount.deposit(200)
  normalAccount.withdraw(1000)
  expect(normalAccount.balance).toEqual(200)

})

it("should withdraw from account and deposit", () =>{

  normalAccount.deposit(200)
  normalAccount.withdraw(400)
  expect(normalAccount.balance).toEqual(-200)

})

it("should not withdraw from account and deposit - wrong data provided", () =>{

  normalAccount.deposit(200)
  normalAccount.withdraw(-100)
  expect(normalAccount.balance).toEqual(200)

})

it("should add transaction to Transaction list after proper deposit",()=>
{
  normalAccount.deposit(200)
  expect(normalAccount.transactions.length).toEqual(1)
})
it("should add transaction to Transaction list after proper withdraw",()=>
{
  normalAccount.deposit(200)
  normalAccount.deposit(100)
  expect(normalAccount.transactions.length).toEqual(2)
})
it("should add plenty transaction to Transaction list after proper withdraw",()=>
{
  normalAccount.deposit(200)
  normalAccount.deposit(100)
  normalAccount.deposit(100)
  normalAccount.deposit(100)
  normalAccount.deposit(100)
  normalAccount.deposit(100)
  expect(normalAccount.transactions.length).toEqual(6)
})
  

})

describe("Transaction tests", () =>{
  let transaction:Transaction
  beforeEach(()=>{
  transaction = new Transaction(100,true)
  })

  it("should create transaction with actual date",()=>{
    transaction = new Transaction(100,true)
    expect(transaction.date).toEqual(Date.now())
  })
  
  it("should create transaction with amount = 100",()=>{
    expect(transaction.amount).toEqual(100)
  })

  it("should create transaction with transaction type true",()=>{
    expect(transaction.transactionType).toEqual(true)
  })
  
})
import { NormalAccount,Transaction } from "../src/bank";
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
    it("should not deposit amount to balance", () =>{

      normalAccount.deposit(-100)
      expect(normalAccount.balance).toEqual(0)

  })

  it("should withdraw from account", () =>{

    normalAccount.deposit(200)
    normalAcccount.withdraw(100)
    expect(normalAccount.balance).toEqual(0)

})

it("should not withdraw from account - user wants to withdraw too much", () =>{

  normalAccount.deposit(200)
  normalAcccount.withdraw(1000)
  expect(normalAccount.balance).toEqual(0)

})

it("should withdraw from account and deposit", () =>{

  normalAccount.deposit(200)
  normalAcccount.withdraw(100)
  expect(normalAccount.balance).toEqual(0)

})

it("should not withdraw from account and deposit - wrong data provided", () =>{

  normalAccount.deposit(200)
  normalAcccount.withdraw(-100)
  expect(normalAccount.balance).toEqual(0)

})

})
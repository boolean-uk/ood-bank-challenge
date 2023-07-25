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

})
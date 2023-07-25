
import { BankAccount} from "../src"

describe ("Bank account tests", () => {
    let bankAccount : BankAccount

    beforeEach(() =>{
        bankAccount = new BankAccount();        
    })

     describe("different tests for deposit operation on bank account", () => {

         it("should deposit 200 to accout", () => {
             bankAccount.deposit(200, new Date());
             expect(bankAccount.getBalance()).toEqual(200);
             bankAccount.deposit(200.55, new Date());
             expect(bankAccount.getBalance()).toEqual(400.55);
         })

         it("shouldn't deposit negative or 0", () => {
            bankAccount.deposit(200, new Date());
            bankAccount.deposit(-200, new Date());
            expect(bankAccount.getBalance()).toEqual(200);
         })
     })

     describe("tests for withdraw operation", () => {

        it("should withdraw 200 from account", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
        })

        it("shouldn't withdraw below 0 from account", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
        })

        it("shouldn't withdraw if amount is negative", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(-200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
        })
        it("should be able to overdraft to 500 if it is allowed", () => {
            bankAccount.deposit(200, new Date())
            bankAccount.withdraw(250, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.setOverdraftToTrue()
            bankAccount.withdraw(250, new Date())
            expect(bankAccount.getBalance()).toEqual(-50);
            bankAccount.withdraw(450, new Date())
            expect(bankAccount.getBalance()).toEqual(-500);
            bankAccount.withdraw(1, new Date())
            expect(bankAccount.getBalance()).toEqual(-500);

        }) 


        
     })
      
     describe("testing print statement", () => {
        it("should print correctly", () => {
            /*
            const date = new Date('01/10/2012')
            const date1 = new Date('01/13/2012')
            const date2 = new Date('01/14/2012')            
            bankAccount.deposit(1000, date)
            bankAccount.deposit(2000, date1)
            bankAccount.withdraw(500, date2)



            
            const correctStatement = `14/01/2012 ||         ||  500.00 || 2500.00
            13/01/2012 || 2000.00 ||         || 3000.00
            10/01/2012 || 1000.00 ||         || 1000.00`

            const statementFromPrintMethod = bankAccount.printStatement()
            expect(statementFromPrintMethod).toContain(correctStatement)
*/



const date = new Date('02/10/2022')
const date1 = new Date('02/12/2022')
const date2 = new Date('02/13/2022')            
bankAccount.deposit(1000, date)
bankAccount.deposit(3000, date1)
bankAccount.withdraw(500, date2)


let result: string = bankAccount.printStatement()
const expected: string[] = []
expected.push("date       ||  credit   ||   debit   || balance\n");
expected.push("13/02/2022 ||         ||  500.00 || 3500.00\n");
expected.push("12/02/2022 || 3000.00 ||         || 4000.00\n");
expected.push("10/02/2022 || 1000.00 ||         || 1000.00\n");



expect(result).toBe(expected.join(""));

        })
     })
    
})
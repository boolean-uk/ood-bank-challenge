import { Client } from "../src/client"
import { Bank } from "../src/bank"
import { Account } from "../src/account"

describe("Bank tests ", () => {

    // let registerClient: Client
    // let newClient: Client
    let bank: Bank
    let account: Account

    beforeEach(() => { 
        // registerClient = new Client("John", "Smith", "01-10-1998")
        // newClient = new Client("Chris", "Test", "01-12-1990")
        bank = new Bank()
        account = new Account()
    })

    //DEPOSIT
    it("should add transaction to credit object", () => {
        let amount = 2000
        let d = new Date('06-07-2023')

        expect(account.deposit(amount, d)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCredit()).length).toEqual(1)
    })

    it("should add transaction to credit object with today's date", () => {
        let amount = 2000

        expect(account.deposit(amount)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCredit()).length).toEqual(1)
    })

    it("should add 3 transactions to credit object", () => {
        let amount1 = 2000
        let amount2 = 1000
        let amount3 = 500
        let d = new Date('06-07-2023')
        let listOfAmounts = [amount1, amount2, amount3]

        expect(account.deposit(amount1)).toEqual("Money added to deposit")
        expect(account.deposit(amount2)).toEqual("Money added to deposit")
        expect(account.deposit(amount3)).toEqual("Money added to deposit")
        expect(Object.keys(account.getCredit()).length).toEqual(1)
        expect(account.getCredit().d).toEqual(listOfAmounts)
    })

    it("should not add any transactions to credit object", () => {
        let amount = -2000

        expect(account.deposit(amount)).toEqual("No money to add to deposit")
    })

    //WITHDRAW
    it("should add transaction to debit object", () => {
        let amount = 2000
        let d = new Date('06-07-2023')

        expect(account.withdraw(amount, d)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebit()).length).toEqual(1)
    })

    it("should add transaction to credit object with today's date", () => {
        let amount = 2000

        expect(account.withdraw(amount)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebit()).length).toEqual(1)
    })

    it("should add 3 transactions to credit object", () => {
        let amount1 = 2000
        let amount2 = 1000
        let amount3 = 500
        let d = new Date('06-07-2023')
        let listOfAmounts = [amount1, amount2, amount3]

        expect(account.withdraw(amount1)).toEqual("Money withdrew")
        expect(account.withdraw(amount2)).toEqual("Money withdrew")
        expect(account.withdraw(amount3)).toEqual("Money withdrew")
        expect(Object.keys(account.getDebit()).length).toEqual(1)
        expect(account.getDebit().d).toEqual(listOfAmounts)
    })

    it("should not add any transactions to credit object", () => {
        let amount = 0

        expect(account.withdraw(amount)).toEqual("No money to withdraw from deposit")
    })

    //BALANCE
    it("should count balanace of account based on transactions example 1", () => {
        let amountToDeposit = 1000;
        let amountToWithdraw = 700;
        let date1 = new Date("01/12/2020")
        let date2 = new Date("02/12/2020")
        account.deposit(amountToDeposit, date1);
        account.withdraw(amountToWithdraw, date2);

        expect(account.countBalanceTotal(account.getCreditList(), account.getDebitList())).toEqual(300);
    
    })

    it("should count balanace of account based on transactions example 2", () => {
        let amountToDeposit1 = 1000;
        let amountToDeposit2 = 1500;
        let amountToWithdraw = 700;
        let date1 = new Date("01/12/2020")
        let date2 = new Date("02/12/2020")
        let date3 = new Date("03/12/2020")
        account.deposit(amountToDeposit1, date1); //1000
        account.deposit(amountToDeposit1, date1); //2000
        account.withdraw(amountToWithdraw, date2); //1300
        account.deposit(amountToDeposit2, date3); //2800

        expect(account.countBalanceTotal(account.getCreditList(), account.getDebitList())).toEqual(300);
    
    })

    it("should give a following statement", () => {
        let amountToDeposit = 1000;
        let amountToWithdraw = 700;
        let date1 = Date("01-12-2020")
        let date2 = Date("02-12-2020")
        account.deposit(amountToDeposit, date1);
        account.withdraw(amountToWithdraw, date2);
    
        let balance = account.countBalanceTotal()
        let st = []
        let tmpCreditList = structuredClone(account.getCredit())
        let tmpDebitList = structuredClone(account.getDebit())
        st.push("date       || ")
        st.push("credit  || ")
        st.push("debit  || ")
        st.push("balance \n")
    
        let allDates = []
        allDates.push(Object.keys(tmpCreditList))
        allDates.push(Object.keys(tmpDebitList))
        allDates.reverse()
    
        for (let date in allDates) {
            let previousValue = balance
            st.push(date)
            st.push(" || ")
            if (tmpCreditList.containsKey(date)) {
                for (let d = 0; d < tmpCreditList.date.length; d++) {
                    st.push(tmpCreditList.date[d] + "  ||        || ")
                    balance -= tmpCreditList.date[d]
                }
                delete tmpCreditList[date]
            }
            if (tmpDebitList.containsKey(date)) {
                for (let d = 0; d < tmpDebitList.date.length; d++) {
                        st.push("        || ")
                        st.push(tmpDebitList.date[d] + "  || ")
                        balance += tmpDebitList.date[d]
                }
                delete tmpDebitList[date]
            }
            st.push(previousValue + "\n")
        }
        
        expect(account.generateStatement()).toBe(st.join(""))
    })

})
import { BankAccount } from "./BankAccount";


export class StatementGenerator {
    
    public static generateStatement(account: BankAccount): String {
        let maxCreditLength = 6
        let maxDebitLength = 5
        let maxBalanceLength = 7
        let currentBalance = 0
        let transactions = account.getTransactions()
        for(let i = 0; i < transactions.length; ++i) {
            let currentAmount = transactions[i].getAmount() - transactions[i].getFee()
            currentBalance += currentAmount
            maxBalanceLength = Math.max(maxBalanceLength, String(currentBalance.toFixed(2)).length)
            if(currentAmount >= 0)
                maxCreditLength = Math.max(maxCreditLength, String(currentAmount.toFixed(2)).length)
            else
                maxDebitLength = Math.max(maxDebitLength, String(currentAmount.toFixed(2)).length)
        }
        console.log(`date${' '.repeat(6)} || ${padToRightSpaces("credit", maxCreditLength)} || ${padToRightSpaces("debit", maxDebitLength)} || balance`)
        currentBalance = 0
        for(let i = 0; i < transactions.length; ++i) {
            let toPrint = ""
            const transaction = transactions[i]
            let currentAmount = transactions[i].getAmount() - transactions[i].getFee()
            currentBalance += currentAmount
            toPrint += `${formatDate(transaction.getDate())} || `
            if (currentAmount >= 0)
                toPrint += `${padToLeftSpaces(String(currentAmount.toFixed(2)), maxCreditLength)} || ${' '.repeat(maxDebitLength)} || ${padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength)}`
            else 
                toPrint += `${' '.repeat(maxCreditLength)} || ${padToLeftSpaces(String(currentAmount.toFixed(2)), maxDebitLength)} || ${padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength)}`
            console.log(toPrint)
        }
        return ""
    }

}

function padToRightSpaces(input: string, numSpaces: number): string {
    if (numSpaces <= input.length)
      return input
    const spaces = ' '.repeat(numSpaces - input.length)
    return input + spaces;
}

function padToLeftSpaces(input: string, numSpaces: number): string {
    if (numSpaces <= input.length)
      return input
    const spaces = ' '.repeat(numSpaces - input.length)
    return spaces + input;
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
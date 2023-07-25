import { BankAccount } from "./BankAccount";
import { Transaction } from "./Transaction";


export class StatementGenerator {
    
    public static generateStatement(transactions: Transaction[]): String {
        let maxCreditLength = 6
        let maxDebitLength = 5
        let maxBalanceLength = 7
        let currentBalance = 0
        let statement = ""
        for(let i = 0; i < transactions.length; ++i) {
            let currentAmount = transactions[i].getAmount() - transactions[i].getFee()
            currentBalance += currentAmount
            maxBalanceLength = Math.max(maxBalanceLength, String(currentBalance.toFixed(2)).length)
            if(currentAmount >= 0)
                maxCreditLength = Math.max(maxCreditLength, String(currentAmount.toFixed(2)).length)
            else
                maxDebitLength = Math.max(maxDebitLength, String(currentAmount.toFixed(2)).length)
        }
        statement += `${padToMiddleSpaces("date", 10)} || ${padToMiddleSpaces("credit", maxCreditLength)} || ${padToMiddleSpaces("debit", maxDebitLength)} || ${padToMiddleSpaces("balance", maxBalanceLength)}\n`
        currentBalance = 0
        for(let i = 0; i < transactions.length; ++i) {
            let transactionInfo = ""
            const transaction = transactions[i]
            let currentAmount = transactions[i].getAmount() - transactions[i].getFee()
            currentBalance += currentAmount
            transactionInfo += `${formatDate(transaction.getDate())} || `
            if (currentAmount >= 0)
                transactionInfo += `${padToLeftSpaces(String(currentAmount.toFixed(2)), maxCreditLength)} || ${' '.repeat(maxDebitLength)} || ${padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength)}\n`
            else 
                transactionInfo += `${' '.repeat(maxCreditLength)} || ${padToLeftSpaces(String(currentAmount.toFixed(2)), maxDebitLength)} || ${padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength)}\n`
            statement += transactionInfo
        }
        return statement
    }
    
    public static generateStatementBetweenDates(transactions: Transaction[], dateFrom: Date, dateTo: Date) {
        let selectedTransactions = transactions.filter(t => (t.getDate() >= dateFrom && t.getDate() <= dateTo))
        return this.generateStatement(selectedTransactions)
    }
}

function padToRightSpaces(input: string, numSpaces: number): string {
    if (numSpaces <= input.length)
        return input
    const spaces = ' '.repeat(numSpaces - input.length)
    return input + spaces
}

function padToLeftSpaces(input: string, numSpaces: number): string {
    if (numSpaces <= input.length)
        return input
    const spaces = ' '.repeat(numSpaces - input.length)
    return spaces + input
}

export function padToMiddleSpaces(input: string, numSpaces: number): string {
    if (numSpaces <= input.length)
        return input
    const leftCount = Math.floor((numSpaces - input.length) / 2)
    const rightCount = Math.ceil((numSpaces - input.length) / 2)
    return `${' '.repeat(leftCount)}${input}${' '.repeat(rightCount)}`
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
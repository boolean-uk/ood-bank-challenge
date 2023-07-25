import {Transaction} from "./Transaction";

export class BankStatementGenerator {

    generateBankStatement(transactions: Transaction[]): string {
        const result: string[] = []
        let balance: number = 0
        result.push("date       ||  credit   ||   debit   || balance\n");

        transactions.forEach((transaction: Transaction) => {
            balance += transaction.getType() === 'deposit' ? transaction.getAmount() : -transaction.getAmount()
            if(transactions.includes(transaction)) {
                result.push(transaction.getTransactionDate().padEnd(11) + "||")

                if (transaction.getType() === 'deposit') {
                    result.push(" " + String(transaction.getAmount().toFixed(2)).padEnd(10))
                    result.push("||" + " ".repeat(11))
                } else {
                    result.push(" ".repeat(11) + "||")
                    result.push(" " + String(transaction.getAmount().toFixed(2)).padEnd(10))
                }
                result.push("|| " + String(balance.toFixed(2)))
                result.push("\n")
            }
        })

        return result.join("")
    }
}
import {Transaction} from "./Transaction";

export class BankStatementGenerator {

    generateBankStatement(transactions: Transaction[]): string {
        const result: string[] = []
        let balance: number = 0
        result.push("date       || credit  ||  debit  || balance\n");

        transactions.forEach((transaction: Transaction) => {
            balance += transaction.getType() === 'deposit' ? transaction.getAmount() : -transaction.getAmount()
            if(transactions.includes(transaction)) {
                result.push(transaction.getTransactionDate().padEnd(11) + "||")

                if (transaction.getType() === 'deposit') {
                    result.push(" " + String(transaction.getAmount()).padEnd(8))
                    result.push("||" + " ".repeat(9))
                } else {
                    result.push(" ".repeat(9) + "||")
                    result.push(" " + String(transaction.getAmount()).padEnd(8))
                }
                result.push("|| " + String(balance))
                result.push("\n")
            }
        })

        return result.join("")
    }
}
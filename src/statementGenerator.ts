import Transaction from "./transaction"

class StatementGenerator {

    generateStatementWithDates (transactions: Transaction[], date1: Date, date2: Date): string {
        let datedTransactions: Transaction[] = []
        transactions.forEach((transaction) => {
            if(transaction.date >= date1 && transaction.date <= date2) {
                datedTransactions.push(transaction)
            }
        })
        return this.generateStatement(datedTransactions)
    }

    generateStatement(transactions: Transaction[]): string {
        let balance: number = 0
        let statement: string = "date      || credit  || debit  || balance \n"
        transactions.forEach((transaction) => {
            statement +=  transaction.date.getDate() + '/' + (transaction.date.getMonth()+1) + '/' + transaction.date.getFullYear() + ' || '
            balance += transaction.amount
            if(transaction.amount >=0){
                statement += transaction.amount 
                statement += '      ' 
                statement += '||        || '
            } else {
                statement += '        || '
                statement += -transaction.amount
                statement += '      || '
            }
            statement += balance + '\n'
        })

        return statement
    }
}

export default StatementGenerator
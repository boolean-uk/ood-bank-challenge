import {Customer} from "./customer";
import {Transaction} from "./transaction";

export class StatementFormatter {
    constructor(private _customer: Customer) {
        this._customer = _customer
    }
    get customer() {
        return this._customer;
    }

    generateStatement(): string {
        let statement: string = 'date       || credit || debit  || balance\n'
        let transactions: Transaction[] = this.customer.account.transactions
        let sum: number = 0.00
        for(let transaction of transactions){
            let date: Date = transaction.date
            const month = (date.getMonth() + 1).toLocaleString('en-EU', { minimumIntegerDigits: 2 });
            let formatDate: string = date.getDate() + '/' + month + '/' + date.getFullYear()
            sum+= parseFloat(transaction.amount.toFixed(2))
            if(transaction.type)
                statement+= formatDate + ' || ' + transaction.amount.toFixed(2) +' || ' + '      ' +
                ' || ' + sum.toFixed(2) + '\n'
            else
                statement+= formatDate + ' || ' + '      ' + ' || ' + Math.abs(transaction.amount*(-1)).toFixed(2) +
                    ' || ' + sum.toFixed(2) + '\n'
        }
        console.log(statement)
        return statement
    }
}
import { Account } from './Account';

import { LocalDateTime, DateTimeFormatter } from 'js-joda';

export class BankStatement {
    static StatementPrint: string[] = [];
    public static printStatement(): string {
        this.StatementPrint = [];
        this.StatementPrint.push("date       || credit || debit  || balance \n");
        console.log("------------------------------------------\n");
        let balance: number = 0;

        for (let i = 0; i < Account.transactionHistory.length; i++) {
            const transactionAmount: number = Account.transactionHistory[i];
            const transactionDate: LocalDateTime = Account.transactionDate[i];

            if (transactionAmount > 0) {
                this.StatementPrint.push(
                    `${transactionDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))} || ${transactionAmount}   ||        || ${balance += transactionAmount}\n`);
            } else {
                this.StatementPrint.push(
                    `${transactionDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))} ||        ||  ${transactionAmount}  || ${balance += transactionAmount}\n`);
            }
        }
        this.StatementPrint.push("------------------------------------------\n");
        return this.StatementPrint.toString();
    }
}
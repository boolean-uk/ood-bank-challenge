import { Account } from './Account';
import { CheckingAccount } from './CheckingAccount';

import { LocalDateTime, DateTimeFormatter } from 'js-joda';

export class BankStatement {
    public static printStatement(): boolean {
        console.log("date       || credit || debit  || balance");
        console.log("------------------------------------------");
        let balance: number = 0;

        for (let i = 0; i < Account.transactionHistory.length; i++) {
            const transactionAmount: number = Account.transactionHistory[i];
            const transactionDate: LocalDateTime = Account.transactionDate[i];

            if (transactionAmount > 0) {
                console.log(
                    `${transactionDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))} || ${transactionAmount}   ||        || ${balance += transactionAmount}`
                );
            } else {
                console.log(
                    `${transactionDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))} ||        ||  ${transactionAmount}  || ${balance += transactionAmount}`
                );
            }
        }
        console.log("------------------------------------------");
        return true;
    }
}
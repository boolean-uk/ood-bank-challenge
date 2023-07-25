import { Account } from './account';

export class StatementFormatter {
    private account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    generateFormattedStatement(): string {
        let balance = 0;
        let statement = '';

        for (const transaction of this.account.transactions) {
            balance += transaction.amount;
            const newLine =
                transaction.dateToString() +
                ' || ' +
                (transaction.amount >= 0
                    ? transaction.amount + ' || || '
                    : '|| ' + Math.abs(transaction.amount) + ' || ') +
                balance;
            statement = newLine + '\n' + statement;
        }

        statement = 'date || credit || debit || balance\n' + statement;
        return statement.trim();
    }
}

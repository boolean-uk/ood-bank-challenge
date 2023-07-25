export interface TransactionInterface {
    date: Date;
    type: String,
    amount: number;
    balance: number;
}

export class Transaction {
    addTransaction(type: string, amount: number, balance: number): TransactionInterface {
        return {
            date: new Date(),
            type: type,
            amount: amount,
            balance: balance,
        };
    }
}
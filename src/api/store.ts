import { defineStore } from 'pinia';
import { Banking } from './banking.ts';

const banking = new Banking();

interface Transaction {
    date: Date;
    type: String,
    credit: number;
    debit: number;
    balance: number;
}

export const useStore = defineStore('store', {
    state: () => ({
        balance: banking.getBalance(),
        transactionHistory: [] as Transaction[],
    }),
    actions: {
        withdrawAmount(amount: number) {
            if (amount > 0) {
                if (banking.withdraw(amount)) {
                    this.balance = banking.getBalance();
                    this.addTransaction({
                        date: new Date(),
                        type: "Withdraw",
                        credit: 0,
                        debit: amount,
                        balance: this.balance,
                    });
                } else {
                    console.error("Failed to withdraw in store")
                }
            }
        },
        depositAmount(amount: number) {
            if (amount > 0) {
                if (banking.deposit(amount)) {
                    this.balance = banking.getBalance();
                    this.addTransaction({
                        date: new Date(),
                        type: "Deposit",
                        credit: amount,
                        debit: 0,
                        balance: this.balance,
                    });
                }
            }
        },
        addTransaction(transaction: Transaction) {
            this.transactionHistory.push(transaction);
        },
    },
});

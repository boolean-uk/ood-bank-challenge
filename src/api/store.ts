import { defineStore } from 'pinia';
import { Banking } from './banking.ts';
import {Transaction, TransactionInterface} from './transaction.ts';

const banking = new Banking();
const transaction = new Transaction();

// NOTE: due to the problems of reactivity between
// transactionHistory array, the array has to be "pushed"
// from inside this class and not transaction.ts. Otherwise
// Vue does not notice the changes.
export const useStore = defineStore('store', {
    state: () => ({
        balance: banking.getBalance(),
        transactionHistory: [] as TransactionInterface[],
    }),
    actions: {
        withdrawAmount(amount: number) {
            if (amount > 0) {
                if (banking.withdraw(amount)) {
                    this.balance = banking.getBalance();
                    this.transactionHistory.push(transaction.addTransaction('Withdraw', amount, this.balance))
                } else {
                    console.error("Failed to withdraw in store")
                }
            }
        },
        depositAmount(amount: number) {
            if (amount > 0) {
                if (banking.deposit(amount)) {
                    this.balance = banking.getBalance();
                    this.transactionHistory.push(transaction.addTransaction('Deposit', amount, this.balance))
                } else {
                    console.error("Failed to withdraw in store")
                }
            }
        },
    },
});

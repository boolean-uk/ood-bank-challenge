import { defineStore } from 'pinia';
import { Banking } from './banking.ts';

const banking = new Banking();

export const useStore = defineStore('store', {
    state: () => ({
        balance: banking.getBalance(),
    }),
    actions: {
        withdrawAmount(amount: number) {
            if (amount > 0) {
                if (banking.withdraw(amount)) {
                    this.balance = banking.getBalance();
                } else {
                    console.error("Failed to withdraw in store")
                }
            }
        },
        depositAmount(amount: number) {
            if (amount > 0) {
                if (banking.deposit(amount)) {
                    this.balance = banking.getBalance();
                }
            }
        },
    },
});

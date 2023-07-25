<script setup lang="ts">
import {computed} from 'vue';
import {useStore} from '../../api/store.ts';
import {generatePDF} from "../../api/generator.ts";

const store = useStore();

// NOTE: Not very happy with cloning the array (and calling it reversed),
// but combining those two functions would result in both
// A. unreadable spaghetti code
// B. problems with store promises (main reason)
const transactionHistory = computed(() => store.transactionHistory);
const reversedTransactionHistory = computed(() => {
    return transactionHistory.value.map((transaction) => ({
        ...transaction,
        date: transaction.date.toLocaleString(),
        amount: transaction.amount.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'}),
        balance: transaction.balance.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'}),
    })).reverse();
})

const formatDate = (date: Date): string => {
    return date.toLocaleString();
};

const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'});
};

const handlePrintButtonClick = () => {
    generatePDF(reversedTransactionHistory.value);
};
</script>

<template>
    <div class="card bg-white w-full">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Dashboard</h2>
            <div v-if="reversedTransactionHistory.length === 0">
                <p>Nothing here... yet!</p>
                <p class="m-2">As soon as you make a transaction, your history will be shown here.</p>
            </div>
            <div v-else>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="transaction in reversedTransactionHistory" :key="transaction.date">
                        <td>{{ transaction.date }}</td>
                        <td>{{ transaction.type }}</td>
                        <td>{{ transaction.amount }}</td>
                        <td>{{ transaction.balance }}</td>
                    </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary mt-4" @click="handlePrintButtonClick">Print</button>
            </div>
        </div>
    </div>
</template>
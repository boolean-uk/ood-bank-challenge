<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../api/store.ts';

const store = useStore();

const transactionHistory = computed(() => store.transactionHistory);
const reversedTransactionHistory = computed(() => [...transactionHistory.value].reverse());

const formatDate = (date: Date): string => {
    return date.toLocaleString();
};

const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};
</script>

<template>
    <div class="card bg-white">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Dashboard</h2>
            <div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- Loop through the transaction history and display each entry in the table -->
                    <tr v-for="transaction in reversedTransactionHistory" :key="transaction.date">
                        <td>{{ formatDate(transaction.date) }}</td>
                        <td>{{ (transaction.type) }}</td>
                        <td>{{ formatCurrency(transaction.credit) }}</td>
                        <td>{{ formatCurrency(transaction.debit) }}</td>
                        <td>{{ formatCurrency(transaction.balance) }}</td>
                    </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary mt-4">Print</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
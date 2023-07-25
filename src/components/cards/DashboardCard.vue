<script setup lang="ts">
import {computed} from 'vue';
import {useStore} from '../../api/store.ts';

const store = useStore();

const reversedTransactionHistory = computed(() => store.transactionHistory.reverse());

const formatDate = (date: Date): string => {
    return date.toLocaleString();
};

const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'});
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
                        <td>{{ formatDate(transaction.date) }}</td>
                        <td>{{ (transaction.type) }}</td>
                        <td>{{ formatCurrency(transaction.amount) }}</td>
                        <td>{{ formatCurrency(transaction.balance) }}</td>
                    </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary mt-4" onclick="print_dialog.showModal()">Print</button>
            </div>
        </div>
    </div>

    <dialog id="print_dialog" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-xl text-center mb-4">Statement</h3>
            <div class="mockup-code">
                <pre data-prefix="$"><code>This is a placeholder for now</code></pre>
            </div>
            <p class="font- text-sm text-center mt-4 opacity-50">Click outside to close the window</p>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
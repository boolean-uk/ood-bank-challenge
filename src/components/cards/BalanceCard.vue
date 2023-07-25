<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../api/store.ts';

const store = useStore();

const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};

const formattedBalance = computed(() => formatCurrency(store.balance));
</script>

<template>
    <div class="card w-96 bg-white">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Balance</h2>
            <p>Your wallet - summarized</p>
            <div class="stat">
                <div class="stat-title">Total Balance</div>
                <div class="stat-value">{{ formattedBalance }}</div>
                <div class="stat-desc">21% more than last month</div>
            </div>
        </div>
    </div>
</template>
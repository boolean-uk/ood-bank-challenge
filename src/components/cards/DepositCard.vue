<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../api/store.ts';

const store = useStore();
const amount = ref(0);

const handleDeposit = () => {
    store.depositAmount(amount.value);
    amount.value = 0;
};
</script>

<template>
    <div class="card w-full bg-white">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Deposit</h2>
            <p>...and here you deposit it. Don't waste it!</p>
            <div class="card-actions justify-end">
                <div class="join">
                    <input
                        class="input input-bordered join-item"
                        v-model="amount"
                        type="number"
                        placeholder="Amount"
                    />
                    <button class="btn btn-primary join-item" @click="handleDeposit">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
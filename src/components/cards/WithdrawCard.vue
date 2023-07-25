<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../api/store';

const store = useStore();
const amount = ref(0);

const handleWithdraw = () => {
    store.withdrawAmount(amount.value);
};
</script>

<template>
    <div class="card w-96 bg-white">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Withdraw</h2>
            <p>Here, you withdraw your hard earned money...</p>
            <div class="card-actions justify-end">
                <div class="join">
                    <input
                        class="input input-bordered join-item"
                        v-model="amount"
                        type="number"
                        placeholder="Amount"
                    />
                    <button class="btn btn-primary join-item" @click="handleWithdraw">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
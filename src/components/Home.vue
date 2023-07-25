<script setup lang="ts">
import WithdrawCard from "./cards/WithdrawCard.vue";
import DepositCard from "./cards/DepositCard.vue";
import BalanceCard from "./cards/BalanceCard.vue";
import DashboardCard from "./cards/DashboardCard.vue";
import PrintCard from "./cards/PrintCard.vue";

</script>

<template>
    <div class="container mx-auto mt-8 h-screen">
        <div class="grid grid-cols-3 auto-cols-min gap-8 justify-items-center">
            <WithdrawCard></WithdrawCard>
            <BalanceCard></BalanceCard>
            <DepositCard></DepositCard>
            <div class="col-span-2">
                <DashboardCard></DashboardCard>
            </div>
            <PrintCard></PrintCard>
        </div>
    </div>
</template>

<style scoped>

</style>
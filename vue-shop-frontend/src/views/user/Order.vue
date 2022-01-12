<script setup lang="ts">
import { mapState, useStore } from "vuex";
import { computed, defineComponent } from "vue";

const store = useStore();
const getUserOrders = () => store.dispatch("getUserOrders", store.state.user.id);
const userorders = computed(() => store.state.userorders);
const totalOrderCn = computed(() => store.state.totalOrderCn);
const totalCost = computed(() => store.state.totalCost);
getUserOrders();
</script>

<template>
    <div class="text-center banner">
        <div class="container p-5">
            <div class="p-5">
                <h3>用户订单</h3>
            </div>
        </div>
        <div class="container pt-1 pb-1">
            <h5 class="pb-5">全部订单</h5>
            <div class="row pb-5">
                <div class="col-md-12">
                    <div class="card">
                        <ItemTable :orders="userorders" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container pb-5">
            <div class="row pb-5">
                <div class="col-md-6">
                    <Counter title="总订单数目" :value="totalOrderCn"></Counter>
                </div>

                <div class="col-md-6">
                    <Counter title="总共花费" :value="totalCost" symbol="¥"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
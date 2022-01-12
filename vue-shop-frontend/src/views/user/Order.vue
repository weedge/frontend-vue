<script setup lang="ts">
import { mapState, useStore } from "vuex";
import { computed, defineComponent } from "vue";
//import ItemTable from "../../components/ItemTable.vue";
import Counter from "../../components/Counter.vue";

const store = useStore();
const getUserOrders = () => store.dispatch("getUserOrders", store.state.user.id);
const userorders = computed(() => store.state.userorders);
getUserOrders();
</script>

<template>
    <div class="text-center banner">
        <div class="container p-5">
            <div class="p-5">
                <h1>用户订单</h1>
            </div>
        </div>
        <div class="container pb-5">
            <div class="row pb-5">
                <div class="col-md-6">
                    <Counter title="总订单数目" :value="0"></Counter>
                    <br />
                </div>

                <div class="col-md-6">
                    <Counter title="总共花费" :value="0" symbol="¥"></Counter>
                </div>
                <br />
            </div>
        </div>
        <br />
        <br />

        <div class="container pt-5 pb-5">
            <h5 class="pb-5">全部订单</h5>
            <div class="row pb-5">
                <div class="col-md-12">
                    <div class="card">
                        <ItemTable :orders="userorders" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
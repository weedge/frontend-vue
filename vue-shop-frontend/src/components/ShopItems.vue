<script setup lang="ts">
//import ShopItem from './ShopItem.vue'
import { computed } from 'vue'
import { useStore } from "vuex";

const store = useStore();
const dispatchItems = () => store.dispatch("getItems");
const items = computed(() => store.state.items);
dispatchItems();
</script>

<template>
    <div class="row pb-5">
        <ShopItem v-for="(item, i) in items" :key="i" :item="item"></ShopItem>
    </div>
</template>

<style scoped>
</style>

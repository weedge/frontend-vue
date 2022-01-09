<script lang="ts">
import ShopItem from './ShopItem.vue'
import { defineComponent, computed } from 'vue'
import { mapState, useStore } from "vuex";

export default defineComponent({
    name: "ShopItems",
    comments: { ShopItem },
    setup() {
        const store = useStore();
        return {
            items: computed(() => store.state.items),
        };
    },
})
</script>

<template>
    <div class="row pb-5">
        <ShopItem v-for="(item, i) in items" :key="i" :event="item" />
    </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ item: string }>()
//const count = ref(0)
const textPrefix = (text: string, length: number, suffix = null) => {
    if (text.length > length) {
        return text.substring(0, length) + suffix;
    } else {
        return text;
    }
};
</script>

<template>
    <div class="col-md-4">
        <div class="card p-3 card-custom">
            <h5 class="authBtn">{{ item.name ?? "" }}</h5>
            <hr />
            <small class="authBtnInner pb-3">
                {{
                    textPrefix(item.desc, 100, "...")
                }}
            </small>
            <span>
                <h5>创建时间:</h5>
                <h6 class="authBtnInner pb-3">{{ item.created_at ?? "" }}</h6>
            </span>
            <router-link
                :to="{ name: 'shopItem', params: { id: item.id } }"
                class="btn btn-primary customBtn"
            >查看更多</router-link>
        </div>
        <br />
    </div>
</template>

<style scoped>
</style>
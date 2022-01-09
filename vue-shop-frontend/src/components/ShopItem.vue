<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default {
    name: "ShopItem",
    props: {
        item: {
            type: Object,
            default: () => { },
        },
    },

    setup(props) {
        const textPrefix = (text, length, suffix = null) => {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        };
        return { textPrefix };
    },
}
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
                <h5>Event Date:</h5>
                <h6 class="authBtnInner pb-3">{{ item.date ?? "" }}</h6>
            </span>
            <router-link
                :to="{ name: 'item', params: { id: item.id } }"
                class="btn btn-primary customBtn"
            >View More</router-link>
        </div>
        <br />
    </div>
</template>

<style scoped>
</style>
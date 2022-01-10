<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const store = useStore();
const route = useRoute();

//const item = computed(() => store.getters.getItem(route.params.id));
const dispatchItem = () => store.dispatch("getItem", route.params.id);
const item = computed(() => store.state.item);
dispatchItem();

const router = useRouter();
const buy = async () => {
  try {
    if (store.state.loggedIn) {
      await store.dispatch("order", {
        itemId: route.params.id,
        userId: store.state.user.id,
      });
      return router.push({
        name: "userOrders",
        params: { id: store.state.user.id },
      });
    } else {
      return router.push({
        name: "login",
        query: { redirect: route.fullPath },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="text-center banner p-3 pb-5">
    <div class="container pb-5">
      <div class="row pb-5">
        <div class="col-md-4 col-12">
          <form @submit.prevent="buy">
            <div class="card card-custom p-5">
              <h5 class="authBtn">商品</h5>
              <hr />
              <span>商品名称:</span>
              <small class="authBtnInner pb-3">{{ item.name }}</small>
              <hr />
              <span>商品描述:</span>
              <small class="authBtnInner pb-3">{{ item.desc }}</small>
              <hr />
              <span>创建时间:</span>
              <small class="authBtnInner pb-3">{{ item.created_at }}</small>
              <hr />
              <span>价格:</span>
              <small class="authBtnInner pb-3">${{ item.price }}</small>
              <button type="submit" class="btn btn-primary customBtn">购买</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
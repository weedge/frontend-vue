<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";

//props: ["items", "isAdmin"],

import { ref } from 'vue'
defineProps<{ orders: any }>()
//const count = ref(0)

const router = useRouter();
const store = useStore();
const textPrefix = (text: string, length: number, suffix = null) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
const viewItem = (id) => {
  return router.push({ name: "shopItem", params: { id } });
};
</script>

<template>
  <table class="table table-sm table-hover table-responsive text-left table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">订单id</th>
        <th scope="col">商品名称</th>
        <th scope="col">商品描述</th>
        <th scope="col">价格</th>
        <th scope="col">日期</th>
        <th scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, i) in orders" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ order.order_id }}</td>
        <td>{{ textPrefix(order.shopItem.name, 10, "...") }}</td>
        <td>{{ textPrefix(order.shopItem.desc, 40, "...") }}</td>
        <td>{{ order.shopItem.price }}</td>
        <td>{{ order.shopItem.created_at }}</td>
        <td>
          <button @click="viewItem(order.item_id)" type="button" class="btn btn-primary">查看</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped></style>
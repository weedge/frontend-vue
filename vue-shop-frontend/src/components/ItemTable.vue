<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";

//props: ["items", "isAdmin"],

const router = useRouter();
const store = useStore();

const textPrefix = (text, length, suffix = null) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
const viewItem = (id) => {
  return router.push({ name: "item", params: { id } });
};
const updateItem = (id) => {
  return router.push({ path: "/admin/add", query: { item: id } });
};

const deleteItem = async (id) => {
  try {
    await store.dispatch("deleteItem", id);
  } catch (error) {
    console.log(error);
  }
};

//return { textPrefix, viewItem, updateItem, deleteItem };
</script>

<template>
  <table class="table table-sm table-hover table-responsive text-left table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">商品名称</th>
        <th scope="col">商品描述</th>
        <th scope="col">价格</th>
        <th scope="col">日期</th>
        <th scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in items" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ textPrefix(item.name, 40, "...") }}</td>
        <td>{{ textPrefix(item.desc, 40, "...") }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.date }}</td>
        <td>
          <button @click="viewItem(item.id)" type="button" class="btn btn-primary">查看</button>
          <button @click="updateItem(item.id)" type="button" class="btn btn-info" v-if="isAdmin">更新</button>
          <button
            @click="deleteItem(item.id)"
            type="button"
            class="btn btn-danger"
            v-if="isAdmin"
          >删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped></style>
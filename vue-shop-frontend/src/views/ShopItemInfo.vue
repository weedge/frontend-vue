<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();
const item = computed(() => store.getters.getEvent(route.params.id));
</script>

<template>
  <div class="text-center banner p-3 pb-5">
    <div class="container pb-5">
      <div class="row pb-5">
        <div class="col-md-8 col-12 pb-5">
          <div class="card card-custom p-5">
            <h5 class="authBtn">{{ item.name }}</h5>
            <hr />

            <div class="container">
              <small class="authBtnInner pb-3">{{ item.desc }}</small>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-12">
          <div class="card card-custom p-5">
            <h5 class="authBtn">商品项</h5>
            <hr />
            <span>创建时间:</span>
            <small class="authBtnInner pb-3">{{ item.date }}</small>
            <hr />
            <span>价格:</span>
            <small class="authBtnInner pb-3">${{ item.price }}</small>
            <router-link to="/" class="btn btn-primary customBtn">购买</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
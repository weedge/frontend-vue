<script setup lang="ts">
import { ref, reactive } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// validate
const schema = object({
  email: string().required().email(),
  password: string().required().min(8),
});

useForm({
  validationSchema: schema,
});

// No need to define rules for fields
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField(
  "password"
);

// login action
const user = ref({});
const store = useStore();
const router = useRouter();
const login = async () => {
  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    if (store.state.loggedIn && store.getters["isAdmin"])
      return router.push("/admin/");
    else {
      return router.push({
        name: "user",
        params: { id: store.state.user.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="text-center banner p-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-custom p-5">
            <div class="container p-5">
              <div class="pb-5">
                <div class="text-center pb-3">
                  <h5 class="authBtn">登录</h5>
                  <small class="authBtnInner"></small>

                  <hr />
                </div>

                <form @submit.prevent="login">
                  <div class="form-group">
                    <input
                      name="email"
                      type="email"
                      v-model="email"
                      class="form-control"
                      placeholder="Email"
                    />
                    <span class="text-danger">{{ emailError }}</span>
                  </div>
                  <div class="form-group">
                    <input
                      name="password"
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
                    />
                    <span class="text-danger">{{ passwordError }}</span>
                  </div>
                  <button type="submit" class="btn btn-primary btn-lg btn-block customBtn">登录</button>
                </form>
              </div>
              <p>
                新用户？
                <router-link to="/register">请注册</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { object, string, ref as yupRef } from "yup";

// validate
const schema = object({
  email: string().required().email(),
  password: string().required().min(3),
  password_confirmation: string().oneOf(
    [yupRef("password"), null],
    "Passwords must match"
  ),
  name: string().required(),
});

useForm({
  validationSchema: schema,
});

// No need to define rules for fields
const { value: email, errorMessage: emailError } = useField("email");
const {
  value: password_confirmation,
  errorMessage: password_confirmationError,
} = useField("password_confirmation");
const { value: password, errorMessage: passwordError } = useField(
  "password"
);
const { value: name, errorMessage: nameError } = useField("name");

// register action
const store = useStore();
const router = useRouter();
const register = async () => {
  try {
    await store.dispatch("register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    return router.push({
      name: "userOrders",
      params: { id: store.state.user.id },
    });
  } catch (err) {
    //todo: upload crash log
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
            <div class="container">
              <div class="pb-5">
                <div class="text-center pb-3">
                  <h5 class="authBtn">注册</h5>
                  <small class="authBtnInner"></small>
                  <hr />
                </div>

                <form @submit.prevent="register">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="name"
                      class="form-control"
                      placeholder="用户名"
                      name="name"
                    />
                    <span class="text-danger">{{ nameError }}</span>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      placeholder="Email"
                      name="email"
                    />
                    <span class="text-danger">{{ emailError }}</span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="密码"
                      name="password"
                    />
                    <span class="text-danger">{{ passwordError }}</span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="password_confirmation"
                      class="form-control"
                      placeholder="请重复输入密码"
                      name="password_confirmation"
                    />
                    <span class="text-danger">{{ password_confirmationError }}</span>
                  </div>
                  <button type="submit" class="btn btn-primary btn-lg btn-block customBtn">注册</button>
                </form>
              </div>
              <p>
                已注册?
                <router-link to="/login">登录</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
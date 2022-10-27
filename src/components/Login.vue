<template>
  <section class="auth px-4 flex flex-col justify-center">
    <h1 class="text-3xl text-center text-blue-600 font-bold mb-4">Price checker Smart</h1>
    <p class="text-center mb-8">Сервис аналитики цен конкурентов</p>
    <p v-if="error.text !== ''" class="text-center text-red-500">
      {{ error.text }}
    </p>
    <form @submit.prevent="handleSubmit" class="auth__form flex flex-col h-full">
      <input
        class="border-2 h-12 pl-2 rounded mb-2"
        type="text"
        placeholder="Логин"
        v-model="loginData.login"
      />
      <input
        class="border-2 h-12 pl-2 rounded mb-2"
        type="password"
        placeholder="Пароль"
        v-model="loginData.password"
      />
      <input
        class="bg-blue-400 h-12 rounded text-white font-bold"
        type="submit"
        value="Вход"
      />
    </form>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import store from "../store";
import { useRouter } from "vue-router";

const loginData = reactive({
  login: "Admin",
  password: "321",
});

const error = reactive({ text: "" });

const router = useRouter();

const handleSubmit = async () => {
  const response = await axios
    .post("https://houmi.store/apiv3/hs/api_v2", {
      section: "authorization",
      login: loginData.login,
      password: loginData.password,
    })
    .then((response) => {
      if (response.data.auth_status !== "authorized") {
        console.log(response.data);
        error.text = response.data.error;
      } else {
        const data = response.data;
        Object.assign(data, { name: loginData.login });
        store.dispatch("saveUser", data);
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    });
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 100vh;
}
</style>

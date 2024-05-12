<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();
const username = ref("");
const password = ref("");
async function handleLogin() {
  const response = await axios.post("/api/login", {
    username: username.value,
    password: password.value,
  });
  if (response.status == 200) {
    router.push({ name: "foodAdminGet" });
  } else {
    toast.error("Error! Can not log in!");
  }
}
</script>

<template>
  <div
    class="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0"
  >
    <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
      <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl"
        >
          Sign in to your account
        </h1>
        <form class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <label
              class="mb-1 block text-sm font-medium text-black dark:text-white"
              >Username</label
            >
            <input
              type="text"
              v-model="username"
              class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              class="mb-1 block text-sm font-medium text-black dark:text-white"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 sm:text-lg"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

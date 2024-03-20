<script setup lang="ts">
const { signIn } = useAuth();

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/admin/food",
  },
});
const username = ref();
const password = ref();
async function handleAuthSubmit() {
  signIn("credentials", { username: username.value, password: password.value });
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="bg-white-cream m-4 w-full max-w-lg space-y-10 border-2 p-8">
      <div class="flex items-center justify-center space-x-4">
        <h1 class="font-dela text-5xl leading-none">MF</h1>
        <div class="h-16 w-0.5 bg-black"></div>
        <h2 class="font-dela text-2xl leading-none">Sign In</h2>
      </div>
      <form @submit.prevent="handleAuthSubmit" class="space-y-10">
        <div class="space-y-2">
          <div>
            <h2 class="text-xl font-bold">Username</h2>
            <input
              type="text"
              v-model="username"
              class="w-full rounded border-2 px-3 py-2 text-xl"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">Password</h2>
            <input
              type="password"
              v-model="password"
              class="w-full rounded border-2 px-3 py-2 text-xl"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <input
            type="submit"
            class="bg-orange hover:bg-orange/75 cursor-pointer rounded border-2 border-black px-24 py-2 text-2xl text-white"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<!-- file: ~/pages/login.vue -->
<template>
  <div>
    <p>Sign-In Options:</p>
    <button @click="signIn('github')">Github</button>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <button
      @click="
        signIn('credentials', {
          username: 'admin',
          password: 'mJ8OM5IgtgNRna5mQo946TE5g9wtQebV6fuIeOZ49sva3TEJos',
        })
      "
    >
      Username and Password
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn } = useAuth();
</script>

<template>
  <button class="container mx-auto text-red-300" @click="signOut()">
    signout
  </button>
</template>

<script setup lang="ts">
const { signOut } = useAuth();
</script>

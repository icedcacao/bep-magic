<template>
  <button @click="signOut()">signout</button>
</template>

<script setup lang="ts">
const { signOut } = useAuth();
</script>

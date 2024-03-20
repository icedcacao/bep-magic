<template>
  <h1 class="font-dela text-4xl">Food</h1>
  <div class="grid gap-4">
    <AdminMenuGridLabel />
    <AdminMenuItemList />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

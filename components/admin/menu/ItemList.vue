<template>
  <div class="grid gap-4">
    <AdminMenuItem v-for="food in foods.list" :food="food" :key="food._id" />
  </div>
</template>

<script setup lang="ts">
const foods = useFoodStore();
await callOnce(foods.fetch);
</script>

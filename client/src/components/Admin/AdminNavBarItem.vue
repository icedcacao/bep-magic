<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <RouterLink
    :to="item.navigateTo"
    active-class="bg-black/5"
    class="flex items-center rounded-lg px-4 py-2 font-normal text-black hover:bg-black/5"
    >{{ item.name }}</RouterLink
  >
</template>
